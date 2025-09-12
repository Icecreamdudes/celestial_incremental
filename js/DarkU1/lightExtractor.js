addLayer("le", {
    name: "Light Extractor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        logIndex: 0,

        starmetalAlloyToGetTrue: new Decimal(0),
        starmetalAlloyToGet: new Decimal(0),
        starmetalAlloyToGetToGet: new Decimal(1),
        starmetalAlloyReq: new Decimal(1e6),
        starmetalAlloyPause: new Decimal(0),
        starmetalAlloyPauseAgain: new Decimal(0),

        resetAmount: new Decimal(0),
        highestReset: new Decimal(0),

        eclipseShardsToGetTrue: new Decimal(0),
        eclipseShardsToGet: new Decimal(0),
        eclipseShardsToGetToGet: new Decimal(1),
        eclipseShardsReq: new Decimal(1e6),
        eclipseShardsValue: new Decimal(5),
    }},
    automate() {
        if (hasUpgrade("sma", 201)) {
            buyUpgrade("le", 11)
            buyUpgrade("le", 12)
            buyUpgrade("le", 13)
            buyUpgrade("le", 14)
            buyUpgrade("le", 15)
            buyUpgrade("le", 16)
            buyUpgrade("le", 17)
            buyUpgrade("le", 18)
            buyUpgrade("le", 19)
            buyUpgrade("le", 21)
            buyUpgrade("le", 22)
            buyUpgrade("le", 23)
            buyUpgrade("le", 101)
            buyUpgrade("le", 102)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #4cc1c7 0%, #2a79ad 50%, #1a2f78 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#8ca3ff",
            color: "#f5f7ff",
        };
    },
    tooltip: "Light Extractor",
    branches: ["in"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        // Starmetal Alloy
        player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(1.5).floor()).mul(1e2)
        if (player.le.resetAmount.gte(3)) player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.5).floor()).mul(1e2)
        if (player.le.resetAmount.gte(8)) player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.6).floor()).mul(1e2)
        player.le.starmetalAlloyReq = player.le.starmetalAlloyReq.div(player.dn.normalityEffect) 
        player.le.starmetalAlloyReq = player.le.starmetalAlloyReq.div(levelableEffect("st", 208)[0])

        if (player.le.starmetalAlloyPause.gte(0)) layers.le.starmetalReset();
        player.le.starmetalAlloyPause = player.le.starmetalAlloyPause.sub(1)

        if (player.le.starmetalAlloyPauseAgain.gte(0)) layers.le.starmetalResetAgain();
        player.le.starmetalAlloyPauseAgain = player.le.starmetalAlloyPauseAgain.sub(1)

        player.le.starmetalAlloyToGetToGet = player.le.resetAmount.add(1)
        player.le.starmetalAlloyToGetToGet = player.le.starmetalAlloyToGetToGet.mul(buyableEffect("sma", 12))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGet
        if (getLevelableBool("pu", 302)) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(levelableEffect("pu", 302)[0])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(levelableEffect("pu", 302)[1])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("dn", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("sma", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("ep1", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(levelableEffect("pet", 404)[2])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("ma", 23))
        if (hasUpgrade("sma", 204)) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(upgradeEffect("sma", 204))
        if (hasMilestone("db", 102)) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(1.2)

        // Eclipse Shards
        player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(1.7).floor()).mul(1e3)
        if (player.le.resetAmount.gte(3)) player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.5).floor()).mul(1e3)
        if (player.le.resetAmount.gte(8)) player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.6).floor()).mul(1e3)
        player.le.eclipseShardsReq = player.le.eclipseShardsReq.div(player.db.milestone1Effect)

        player.le.eclipseShardsToGetToGet = player.le.resetAmount.add(1)
        player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGet
        if (getLevelableBool("pu", 304)) player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGetTrue.mul(levelableEffect("pu", 304)[0])
        player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGetTrue.mul(levelableEffect("pu", 304)[1])

        player.le.eclipseShardsValue = new Decimal(5)
        player.le.eclipseShardsValue = player.le.eclipseShardsValue.mul(buyableEffect("le", 11)).floor()
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Reset everything in this universe for stored starmetal alloy.<br>Req: " + format(player.le.starmetalAlloyReq) + " Points" },
            canClick() { return player.du.points.gte(player.le.starmetalAlloyReq) },
            unlocked() { return true },
            onClick() {
                player.le.resetAmount = player.le.resetAmount.add(1)
                if (player.le.highestReset.lt(player.le.resetAmount)) player.le.highestReset = player.le.resetAmount
                player.le.starmetalAlloyPause = new Decimal(10)

                player.pu.storedSelections = player.pu.storedSelections.add(1)

                player.le.starmetalAlloyToGet = player.le.starmetalAlloyToGet.add(player.le.starmetalAlloyToGetToGet)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", fontSize: "9px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title() { return "<h2>Return back to the domain of singularity." },
            canClick() { return player.le.starmetalAlloyToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.add(player.le.starmetalAlloyToGetTrue.floor())
                player.le.starmetalAlloyPauseAgain = new Decimal(10)
                for (let prop in player.pu.levelables) {
                    if (getLevelableBool("pu", prop)) {
                        addLevelableXP("pu", prop, player.le.starmetalAlloyToGetTrue.floor())
                    }
                    setLevelableBool("pu", prop, false)
                }
                player.le.starmetalAlloyToGet = new Decimal(0)
                player.le.resetAmount = new Decimal(0)

                if (!hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(0)
                if (hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(1)

                player.sma.inStarmetalChallenge = false
                player.universe = 3
                player.tab = "sma"
                player.subtabs.pu["stuff"] = "Collection"

                layers.pu.generateSelection();
            },
            style() {
                let look = {width: "400px", minHeight: "100px", fontSize: "9px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title() { return "<h2>Reset everything in this universe for stored eclipse shards.<br>Req: " + format(player.le.eclipseShardsReq) + " Points" },
            canClick() { return player.du.points.gte(player.le.eclipseShardsReq) },
            unlocked() { return true },
            onClick() {
                player.le.resetAmount = player.le.resetAmount.add(1)
                if (player.le.highestReset.lt(player.le.resetAmount)) player.le.highestReset = player.le.resetAmount
                player.le.starmetalAlloyPause = new Decimal(10)

                player.pu.storedSelections = player.pu.storedSelections.add(1)

                player.le.eclipseShardsToGet = player.le.eclipseShardsToGet.add(player.le.eclipseShardsToGetToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", fontSize: "9px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        14: {
            title() { return "<h2>Return back to the domain of singularity." },
            canClick() { return player.le.eclipseShardsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.sma.eclipseShards = player.sma.eclipseShards.add(player.le.eclipseShardsToGetTrue.floor())
                player.le.starmetalAlloyPauseAgain = new Decimal(10)
                for (let prop in player.pu.levelables) {
                    if (getLevelableBool("pu", prop)) {
                        addLevelableXP("pu", prop, player.le.eclipseShardsToGetTrue.mul(player.le.eclipseShardsValue).floor())
                    }
                    setLevelableBool("pu", prop, false)
                }
                player.le.starmetalAlloyToGet = new Decimal(0)
                player.le.eclipseShardsToGet = new Decimal(0)
                player.le.resetAmount = new Decimal(0)

                if (!hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(0)
                if (hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(1)

                player.sma.inStarmetalChallenge = false
                player.universe = 3
                player.tab = "sma"
                player.subtabs.pu["stuff"] = "Collection"

                player.pet.activeAbilities[0] = false
                player.pet.legendaryPetAbilityTimers[0] = new Decimal(0)
                layers.pu.generateSelection();
            },
            style() {
                let look = {width: "400px", minHeight: "100px", fontSize: "9px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        101: {
            title: "Excerpt",
            canClick: true,
            unlocked: true,
            onClick() {
                player.le.logIndex = 0
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        102: {
            title: "Log 1",
            canClick: true,
            unlocked() {return tmp.pu.levelables[101].canClick},
            onClick() {
                player.le.logIndex = 1
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        103: {
            title: "Log 2",
            canClick: true,
            unlocked() {return tmp.pu.levelables[201].canClick},
            onClick() {
                player.le.logIndex = 2
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        104: {
            title: "Log 3",
            canClick: true,
            unlocked() {return tmp.pu.levelables[102].canClick},
            onClick() {
                player.le.logIndex = 3
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        105: {
            title: "Log 4",
            canClick: true,
            unlocked() {return tmp.pu.levelables[103].canClick},
            onClick() {
                player.le.logIndex = 4
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        106: {
            title: "Log 5",
            canClick: true,
            unlocked() {return tmp.pu.levelables[104].canClick},
            onClick() {
                player.le.logIndex = 5
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        107: {
            title: "Log 6",
            canClick: true,
            unlocked() {return tmp.pu.levelables[105].canClick},
            onClick() {
                player.le.logIndex = 6
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        108: {
            title: "Log 7",
            canClick: true,
            unlocked() {return tmp.pu.levelables[202].canClick},
            onClick() {
                player.le.logIndex = 7
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        109: {
            title: "Log 8",
            canClick: true,
            unlocked() {return tmp.pu.levelables[106].canClick},
            onClick() {
                player.le.logIndex = 8
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        110: {
            title: "Log 9",
            canClick: true,
            unlocked() {return tmp.pu.levelables[107].canClick},
            onClick() {
                player.le.logIndex = 9
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        111: {
            title: "Log 10",
            canClick: true,
            unlocked() {return tmp.pu.levelables[203].canClick},
            onClick() {
                player.le.logIndex = 10
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        112: {
            title: "Log 11",
            canClick: true,
            unlocked() {return tmp.pu.levelables[204].canClick},
            onClick() {
                player.le.logIndex = 11
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        113: {
            title: "Log 12",
            canClick: true,
            unlocked() {return tmp.pu.levelables[108].canClick},
            onClick() {
                player.le.logIndex = 12
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        114: {
            title: "Log 13",
            canClick: true,
            unlocked() {return tmp.pu.levelables[205].canClick},
            onClick() {
                player.le.logIndex = 13
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        115: {
            title: "Log 14",
            canClick: true,
            unlocked() {return tmp.pu.levelables[206].canClick},
            onClick() {
                player.le.logIndex = 14
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        116: {
            title: "Log 15",
            canClick: true,
            unlocked() {return tmp.pu.levelables[301].canClick},
            onClick() {
                player.le.logIndex = 15
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        117: {
            title: "Log X1",
            canClick: true,
            unlocked() {return tmp.pu.levelables[302].canClick},
            onClick() {
                player.le.logIndex = 16
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        118: {
            title: "Log X2",
            canClick: true,
            unlocked() {return tmp.pu.levelables[302].canClick},
            onClick() {
                player.le.logIndex = 17
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
        119: {
            title: "Log X3",
            canClick: true,
            unlocked() {return tmp.pu.levelables[302].canClick},
            onClick() {
                player.le.logIndex = 18
            },
            style: {width: "135px", minHeight: "40px", color: "white", backgroundColor: "#384166", border: "3px solid rgba(0,0,0,0.5)"},
        },
    },
    starmetalReset() {
        player.du.points = new Decimal(0)
        player.du.pointGain = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)
        player.dr.pent = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.rankPointsPerSecond = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tierPointsPerSecond = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
        player.dr.tetrPointsPerSecond = new Decimal(0)
        player.dr.pentPoints = new Decimal(0)
        player.dr.pentPointsPerSecond = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.prestigePointsToGet = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)
        player.dp.buyables[14] = new Decimal(0)
        player.dp.buyables[15] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorsToGet = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)
        player.dg.generatorPowerPerSecond = new Decimal(0)

        for (let i = 0; i < player.le.upgrades.length; i++) {
            if (+player.le.upgrades[i] < 201) {
                player.le.upgrades.splice(i, 1);
                i--;
            }
        }

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)
        player.dg.buyables[14] = new Decimal(0)
        player.dg.buyables[15] = new Decimal(0)
        player.dg.buyables[16] = new Decimal(0)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)

        player.db.boosters = new Decimal(0)
        for (let i = 0; i < player.db.milestones.length; i++) {
            if (+player.db.milestones[i] < 101) {
                player.db.milestones.splice(i, 1);
                i--;
            }
        }
    },
    starmetalResetAgain() {
        player.du.points = new Decimal(0)
        player.du.pointGain = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)
        player.dr.pent = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.rankPointsPerSecond = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tierPointsPerSecond = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
        player.dr.tetrPointsPerSecond = new Decimal(0)
        player.dr.pentPoints = new Decimal(0)
        player.dr.pentPointsPerSecond = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.prestigePointsToGet = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)
        player.dp.buyables[14] = new Decimal(0)
        player.dp.buyables[15] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorsToGet = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)
        player.dg.generatorPowerPerSecond = new Decimal(0)

        for (let i = 0; i < player.le.upgrades.length; i++) {
            if (+player.le.upgrades[i] < 201) {
                player.le.upgrades.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < player.dn.upgrades.length; i++) {
            if (+player.dn.upgrades[i] < 101) {
                player.dn.upgrades.splice(i, 1);
                i--;
            }
        }

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)
        player.dg.buyables[14] = new Decimal(0)
        player.dg.buyables[15] = new Decimal(0)
        player.dg.buyables[16] = new Decimal(0)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)

        player.dn.normality = new Decimal(0)
        player.dn.buyables[11] = new Decimal(0)
        player.dn.buyables[12] = new Decimal(0)
        player.dn.buyables[13] = new Decimal(0)
        player.db.boosters = new Decimal(0)
        for (let i = 0; i < player.db.milestones.length; i++) {
            if (+player.db.milestones[i] < 101) {
                player.db.milestones.splice(i, 1);
                i--;
            }
        }
    },
    upgrades: {
        11: {
            title: "Ranked Darkness",
            unlocked() { return true },
            description: "Unlocks Ranks.",
            cost: new Decimal(10),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title: "Darked Rankness",
            unlocked() { return true },
            description: "Divides rank requirements by /20.",
            cost: new Decimal(1000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title: "Dark Prestige",
            unlocked() { return true },
            description: "Unlocks Prestige.",
            cost: new Decimal(10000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        14: {
            title: "Dark Bulk I",
            unlocked() { return true },
            description: "Gain the ability to bulk rank resets.",
            cost: new Decimal(100000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        15: {
            title: "Dark Bulk II",
            unlocked() { return true },
            description: "Gain the ability to bulk tier resets.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        16: {
            title: "Dark Auto I",
            unlocked() { return true },
            description: "Automate rank resets.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        17: {
            title: "Dark Generators",
            unlocked() { return hasUpgrade("sma", 12) && !player.pet.activeAbilities[0] },
            description: "Unlocks Generators.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        18: {
            title: "Dark Bulk III",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Gain the ability to bulk tetr resets.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        19: {
            title: "Dark Auto II",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Automate Tier Resets.",
            cost: new Decimal(1e11),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        21: {
            title: "Dark Auto III",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Automate Tetr Resets.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        22: {
            title: "Dark Grass",
            unlocked() { return hasUpgrade("sma", 16) },
            description: "Unlock Dark Grass.",
            cost: new Decimal(1e36),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        23: {
            title: "Normality",
            unlocked() { return hasUpgrade("sma", 17) && !player.pet.activeAbilities[0] },
            description: "Unlock Normality.",
            cost: new Decimal(1e48),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },

        //eclipse exclusive
        101: {
            title: "Dark Boosters",
            unlocked() { return hasUpgrade("sma", 12) && player.pet.activeAbilities[0] },
            description: "Unlocks Boosters.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "rgb(51, 54, 0)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        102: {
            title: "Vaporizer",
            unlocked() { return hasUpgrade("sma", 17) && player.pet.activeAbilities[0] },
            description: "Unlocks The Vaporizer.",
            cost: new Decimal(1e48),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid #384166", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "rgb(51, 54, 0)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    buyables: {
            11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sma.eclipseShards },
            pay(amt) { player.sma.eclipseShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Shard Value Increaser"
            },
            display() {
                return "which are multiplying eclipse shard xp value multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Eclipse Shards"
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
            style: { width: '275px', height: '150px', color: "#384166", "border-color": "#384166" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        0: {
            title: "Excerpt",
            body: "Long before the time of Matos, a civilization of humans lived in the domain of singularity. They extracted the power of the sun using superphysical values. They built giant machines that absorbed all of the suns light. Eventually, their machines grew so large that it obstructed the sky, and polluted the atmosphere. This caused the whole world to be a gloomy, dark, and dystopian wasteland. In the pursuit of light, one must follow through with darkness.",
        },
        1: {
            title: "Log 1",
            body: "My team and I were on an expedition to enter the Celestial Kingdom. It was going decently until one night, I had a very strange dream. All I could remember from that dream was hearing maniacal laughter. However, when we woke up, we were transported to a new dimension. I am going to keep track of the information I find in this new dimension here.",
        },
        2: {
            title: "Log 2",
            body: "We have stumbled upon a peculiar planet. It reminds me of Earth, but something is off. All the trees and grass are red. The river flows with a viscous crimson liquid. Not a single animal in sight. Something about this place puts me off."
        },
        3: {
            title: "Log 3",
            body: "We see ancient ruins of what appears to have been built by a civilization that was once here. They seemed to be quite advanced. A lot of the infrastructure held up pretty well. Our carbon dating suggests that the structures are over twenty thousand years old. I wonder what could have ever happened to this civilization."
        },
        4: {
            title: "Log 4",
            body: "One of my colleagues has found strange spherical devices that emit high levels of radiation. We don't have the protective gear to go near them, but that is something to keep in mind. I don't think we can find a way home any time soon, so we have to call this strange dimension home for the time being. We must stay calm and collected."
        },
        5: {
            title: "Log 5",
            body: "It has been over a week of staying in this dimension. We have made a couple of observations. Days are exactly 24 hours long, and the water in rivers and oceans seems to be corrosive, but we have been able to find a plethora of fruits and vegetables that could sustain us with safe water and nutrients. We will live. We will make it out of here alive. We will find the celestial that has trapped us here, and we will defeat it. I have defeated a celestial before, so I will either win or die trying!"
        },
        6: {
            title: "Log 6",
            body: "We found more strange spherical devices, but these don't emit radiation. It emits a strange celestial energy to boost superphysical values. Strange… These devices must have been made by celestials to make them stronger. We don't see any celestial hunter brand markings on it, so it must have been made by celestials. We must do more investigations."
        },
        7: {
            title: "Log 7",
            body: "We have seen what these devices are capable of. My colleagues and I have tested them out. It emits a strange superphysical power that none of us have ever been aware of. This power seems to be condensed in what appears to be a singularity. Each device is capable of holding a unique fuel source, or a superphysical value that it can boost."
        },
        8: {
            title: "Log 8",
            body: "It has been three weeks now, and we have set up a couple of camps and started farming as well. I don't know why but I can feel a great sense of unease, but that is probably just my homesickness. Tomorrow we will check out one of the largest ruined buildings that we have found. Maybe we can find secrets to this civilization there."
        },
        9: {
            title: "Log 9",
            body: "This ruined building is a temple that must have been used by whoever lived here. Many strange symbols are present, and we speculate that they are celestial symbols. Did this civilization worship celestials? Did celestials destroy this civilization?"
        },
        10: {
            title: "Log 10",
            body: "Further in the temple, we found strange engravings on the floor. There were symbols of dice, stars, rockets, and staircases. In the center, there seemed to be eight torches, with what appeared to be different celestial symbols carved into them. All eight torches surround what appears to be a circle with a dot in the center. Could this be a way out?"
        },
        11: {
            title: "Log 11",
            body: "Good news. We have finally detected something. It appears that another group was sent out to save us, and they had sent us a signal. Thank goodness the corporation finally figured out that we were missing, and that they didn't presume us dead. They somehow managed to track us, but I am unsure of how. I am just glad that we are getting saved."
        },
        12: {
            title: "Log 12",
            body: "They are here. My good friends Kres, Sel, and Nav are here. They came with a lot of supplies and materials that can help us stay here longer, as well as find out more about this place. The bad news is that they are also stuck here with us. None of the superphysical transportation devices are working. The only way we can figure out if we can ever get out of here is by summoning a celestial."
        },
        13: {
            title: "Log 13",
            body: "On a recent expedition, we found three logs that have supposedly been written by the final leader of the civilization that has perished. We found it in a tall building on the top of a mountain. This is a massive breakthrough. We know how this civilization fell. They were defeated by a celestial named Matos. But one thing stands out. Matos has the power to destroy superphysical barriers, so summoning him would give us a way to get out of here. Plus, we are a pretty strong team. Our powers combined can defeat Matos, or at least resist his power well enough. Let's see what the others think."
        },
        14: {
            title: "Log 14",
            body: "They agreed. On the base of the tower, there is an input for the five singularity cores, and the five fully powered singularity cores are there as well. It's as if they were preparing us to summon Matos. Thankfully, Kres and his group brought superphysical fighting gear with them, so we should be able to fight Matos. Turns out the singularity cores were the devices that we had found earlier, and the ones that are prepared here are the strongest variant of singularity cores. We slowly lodge them in, and wait for something to happen. If whoever wrote the logs I found in the building is reading this, I'm sorry for not listening to your warning, but this is for the greater good."
        },
        15: {
            title: "Log 15",
            body: "Help. Matos has murdered four teammates. Me and Kres are hiding right now. When we summoned Matos, the sun instantly turned into a strange eclipse. I have been severely wounded. I don't think I'm going to make it. A strange smoke being has emerged from the center of the mountain and started attacking Matos. It seems to be friendly. If I die, I won't have any regrets. I lived a long and powerful life. I have defeated a celestial before. That is something most people in my line of field can only dream of doing. Well, that's it. Hope Kres and the others make it out. Goodbye."
        },
        16: {
            title: "Log X1",
            body: "It's the end. All of our attempts to please the celestials have failed. No temple is big enough to satisfy their needs. Our cities have grown so large yet so dormant. People are dying. People are suffering.  Every day, large powerful cores of energy strike us down every second. We did everything we could. I don't see a point in continuing."
        },
        17: {
            title: "Log X2",
            body: "It has a name. Its name is Matos. They are responsible for all our torment and tragedy. I was there. I witnessed its true physical form. He is made out of starmetal alloy, like the ones we use in our technology, but much more powerful and concentrated. I understand what is happening. Our civilization has created a celestial. The poor conditions and quality of life throughout these years have led to anger, suffering, despair, and pain, and all of these harsh emotions and conflicts have led to the creation of one, angry, beast of a celestial. Our creator celestials have forgotten about us. We are a failure of a civilization."
        },
        18: {
            title: "Log X3",
            body: "This is it. My final message. As a leader of this civilization, I must put out a message. I don't know who will be reading this. Shoot, I don't know if anyone will ever be reading this. But I have things to say, and I better say them now. If you are reading this, this civilization is long gone. However, the threat of Matos remains. He has the power to destroy full civilizations, manipulate technology, and break superphysical barriers. I've somehow managed to seal him away using all of my remaining power, but he will inevitably return when you fully power up five singularity cores. No matter what happens, don't let him escape. It's for the best that he remains in here."
        },
    },
    microtabs: {
        stuff: {
            "Lore": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Logs", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "50px", backgroundColor: "#1c2033", borderBottom: "3px solid white"}],
                            ["always-scroll-column", [
                                ["hoverless-clickable", 101], ["hoverless-clickable", 102], ["hoverless-clickable", 103], ["hoverless-clickable", 104], ["hoverless-clickable", 105],
                                ["hoverless-clickable", 106], ["hoverless-clickable", 107], ["hoverless-clickable", 108], ["hoverless-clickable", 109], ["hoverless-clickable", 110],
                                ["hoverless-clickable", 111], ["hoverless-clickable", 112], ["hoverless-clickable", 113], ["hoverless-clickable", 114], ["hoverless-clickable", 115],
                                ["hoverless-clickable", 116], ["hoverless-clickable", 117], ["hoverless-clickable", 118],
                            ], {width: "150px", height: "547px"}],
                        ], {width: "150px", height: "600px", backgroundColor: "#0e1019", borderRight: "3px solid white"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return layers.le.infoboxes[player.le.logIndex].title}, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                            ], {width: "447px", height: "50px", backgroundColor: "#384166", borderBottom: "3px solid white"}],
                            ["always-scroll-column", [
                                ["raw-html", () => {return layers.le.infoboxes[player.le.logIndex].body}, {color: "white", lineHeight: "1.8", fontSize: "16px", fontFamily: "georgia"}],
                            ], {width: "427px", height: "527px", backgroundColor: "#1c2033", padding: "10px"}],
                        ], {width: "447px", height: "600px"}],
                    ], {width: "600px", border: "3px solid white"}],
                ]
            },
            "Main": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return !player.pet.activeAbilities[0] },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "You will store +" + formatWhole(player.le.starmetalAlloyToGetToGet) + " starmetal alloy on universe reset." }, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Reset Count: " + formatWhole(player.le.resetAmount)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "10px"],
                    ["raw-html", () => { return "Empty your stored starmetal alloy,<br>gaining +" + formatWhole(player.le.starmetalAlloyToGetTrue) + " starmetal alloy when you leave." }, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 12]]],
                ]
            },
            "Shards": {
                buttonStyle() { return { border: "2px solid rgb(245, 255, 104)", borderRadius: "10px" } },
                unlocked() { return player.pet.activeAbilities[0] },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "You will store +" + formatWhole(player.le.eclipseShardsToGetToGet) + " eclipse shards on universe reset."}, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Reset Count: " + formatWhole(player.le.resetAmount)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 13]]],
                    ["blank", "10px"],
                    ["raw-html", () => { return "Empty your stored eclipse shards,<br>gaining +" + formatWhole(player.le.eclipseShardsToGetTrue) + " eclipse shards when you leave."}, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 14]]],
                    ["blank", "25px"],
                    ["raw-html", () => { return "(Eclipse shards are worth " + formatWhole(player.le.eclipseShardsValue) + " XP each for leveling punchcards.)" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["buyable", 11]]],
                ]
            },
            "Effects": {
                buttonStyle() { return { border: "2px solid rgb(245, 255, 104)", borderRadius: "10px" } },
                unlocked() { return player.pet.activeAbilities[0] },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "^0.7 dark point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", () => { return "^0.6 dark rank, tier, tetr point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", () => { return "^1.4 dark rank, tier, tetr reqs." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", () => { return "^0.8 dark prestige point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["blank", "5px"],
                        ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                            ["upgrade", 17], ["upgrade", 101], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 102]], {maxWidth: "755px"}],
                        ["blank", "5px"],
                    ], {width: "755px", backgroundColor: "#0e1019", border: "2px solid #384166", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["layer-proxy", ["sma", [
                        ["style-column", [
                            ["blank", "5px"],
                            ["raw-html", () => { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["style-row", [["upgrade", 10], ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                                ["upgrade", 17], ["upgrade", 18]], {maxWidth: "755px"}],
                            ["blank", "5px"],
                        ], {width: "755px", background: "linear-gradient(120deg, #171708 0%, #130f05 25%, #17090b 50%, #150917, 75%, #091417 100%)", border: "2px solid #384166", borderRadius: "15px"}],
                    ]]],
                ]
            },
            "Punchcards": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("sma", 14) },
                embedLayer: 'pu',
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge }
})