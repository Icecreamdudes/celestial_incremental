
addLayer("dr", {
    name: "Dark Ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        rank: new Decimal(0),
        rankReq: new Decimal(10), //Points
        rankEffect: new Decimal(1),
        ranksToGet: new Decimal(0),
        rankDiv: new Decimal(1),

        tier: new Decimal(0),
        tierReq: new Decimal(3), //Ranks
        tierEffect: new Decimal(1),
        tiersToGet: new Decimal(0),
        tierDiv: new Decimal(1),

        tetr: new Decimal(0),
        tetrReq: new Decimal(2), //Tiers
        tetrEffect: new Decimal(1),
        tetrsToGet: new Decimal(0),
        tetrDiv: new Decimal(1),

        pent: new Decimal(0),
        pentReq: new Decimal(10), //Tetr
        pentEffect: new Decimal(1),
        pentsToGet: new Decimal(0),
        pentDiv: new Decimal(1),

        rankPoints: new Decimal(0),
        rankPointsEffect: new Decimal(1),
        rankPointsPerSecond: new Decimal(0),

        tierPoints: new Decimal(0),
        tierPointsEffect: new Decimal(1),
        tierPointsPerSecond: new Decimal(0),

        tetrPoints: new Decimal(0),
        tetrPointsEffect: new Decimal(1),
        tetrPointsPerSecond: new Decimal(0),

        pentPoints: new Decimal(0),
        pentPointsEffect: new Decimal(1),
        pentPointsPerSecond: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #175f69 0%, #0d385e 50%, #041440 100%)",
            "background-origin": "border-box",
            "border-color": "#1ba2b5",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Ranks",
    branches: [["le", "#4f0694"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        // Rank/Tier/Tetr/Pent Dividers
        player.dr.rankDiv = new Decimal(1)
        player.dr.rankDiv = player.dr.rankDiv.mul(buyableEffect("dp", 11))
        player.dr.rankDiv = player.dr.rankDiv.mul(levelableEffect("st", 202)[0])

        player.dr.tierDiv = new Decimal(1)
        player.dr.tierDiv = player.dr.tierDiv.mul(buyableEffect("dp", 12))
        player.dr.tierDiv = player.dr.tierDiv.mul(levelableEffect("st", 203)[0])

        player.dr.tetrDiv = new Decimal(1)
        player.dr.tetrDiv = player.dr.tetrDiv.mul(buyableEffect("dp", 13))
        player.dr.tetrDiv = player.dr.tetrDiv.mul(levelableEffect("st", 204)[0])

        player.dr.pentDiv = new Decimal(1)

        //Rank and Tier effects/costs
        let ranksGainPreS = player.du.points.mul(player.dr.rankDiv).div(25).pow(Decimal.div(20, 29)).floor()
        if (hasUpgrade("le", 12)) ranksGainPreS = player.du.points.mul(player.dr.rankDiv).div(25).mul(50).pow(Decimal.div(20, 29)).floor()
        let ranksGainPostS = player.du.points.mul(player.dr.rankDiv).div(25).pow(0.25).floor()
        if (hasUpgrade("le", 12)) ranksGainPostS =  player.du.points.mul(player.dr.rankDiv).div(25).mul(50).pow(0.25).floor()
        let ranksGainPostS2 = player.du.points.mul(player.dr.rankDiv).div(25).pow(Decimal.div(1, 10)).floor()
        if (hasUpgrade("le", 12)) ranksGainPostS2 = player.du.points.mul(player.dr.rankDiv).div(25).mul(50).pow(Decimal.div(1, 10)).floor()
        let ranksGainPostS3 = player.du.points.mul(player.dr.rankDiv).div(25).pow(Decimal.div(1, 100)).floor()
        if (hasUpgrade("le", 12)) ranksGainPostS3 = player.du.points.mul(player.dr.rankDiv).div(25).mul(50).pow(Decimal.div(1, 100)).floor()

        if (!hasUpgrade("sma", 11)) player.dr.rankEffect = player.dr.rank.mul(0.3).add(1).pow(1.055)
        if (hasUpgrade("sma", 11)) player.dr.rankEffect = player.dr.rank.mul(0.5).add(1).pow(1.08)
        if (player.le.punchcards[3]) player.dr.rankEffect = player.dr.rank.mul(0.7).add(1).pow(Decimal.mul(0.5, player.le.punchcardsLevelsEffect[3]).add(1))
        player.dr.rankReq = layers.dr.getRankReq()
        if (player.pet.activeAbilities[0]) player.dr.rankReq = player.dr.rankReq.pow(1.4)
        if (!hasUpgrade("le", 14)) player.dr.ranksToGet = new Decimal(1)


        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).lte(20) && hasUpgrade("le", 14)) {
            player.dr.ranksToGet = ranksGainPreS.sub(player.dr.rank)
        }
        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).gt(20) && hasUpgrade("le", 14)) {
            player.dr.ranksToGet = ranksGainPostS.sub(player.dr.rank).add(18)
        }
        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).gt(100) && hasUpgrade("le", 14)) {
            player.dr.ranksToGet = ranksGainPostS2.sub(player.dr.rank).add(98)
        }
        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).gt(1e50) && hasUpgrade("le", 14)) {
            player.dr.ranksToGet = ranksGainPostS3.sub(player.dr.rank)
        }
        if (player.du.points.lt(player.dr.rankReq) || player.dr.ranksToGet.lt(0)) {
            player.dr.ranksToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 16)) {
            player.dr.rank = player.dr.rank.add(player.dr.ranksToGet)
        }

        let tiersGain = player.dr.rank.mul(player.dr.tierDiv).div(5).pow(Decimal.div(20, 23)).floor()

        if (!hasUpgrade("sma", 11)) player.dr.tierEffect = player.dr.tier.mul(0.4).add(1).pow(1.1)
        if (hasUpgrade("sma", 11)) player.dr.tierEffect = player.dr.tier.mul(0.65).add(1).pow(1.15)
        if (player.le.punchcards[4]) player.dr.tierEffect = player.dr.tier.mul(0.8).add(1).pow(Decimal.mul(0.5, player.le.punchcardsLevelsEffect[4]).add(1.2))
        player.dr.tierReq = layers.dr.getTierReq()
        if (player.pet.activeAbilities[0]) player.dr.tierReq = player.dr.tierReq.pow(1.4)

        if (!hasUpgrade("le", 15)) player.dr.tiersToGet = new Decimal(1)
        if (player.dr.rank.gte(player.dr.tierReq) && hasUpgrade("le", 15)) {
            player.dr.tiersToGet = tiersGain.sub(player.dr.tier)
        }
        if (player.dr.tiersToGet.lt(0) || player.dr.rank.lt(player.dr.tierReq)) {
            player.dr.tiersToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 19)) {
            player.dr.tier = player.dr.tier.add(player.dr.tiersToGet)
        }

        let tetrGain = player.dr.tier.mul(player.dr.tetrDiv).div(4).pow(Decimal.div(25, 28)).floor()

        player.dr.tetrEffect = player.dr.tetr.add(1).pow(1.2)
        if (player.le.punchcards[5]) player.dr.tetrEffect = player.dr.tetr.add(1).pow(Decimal.mul(0.5, player.le.punchcardsLevelsEffect[5]).add(1.4))
        player.dr.tetrReq = layers.dr.getTetrReq()
        if (player.pet.activeAbilities[0]) player.dr.tetrReq = player.dr.tetrReq.pow(1.4)

        if (!hasUpgrade("le", 18)) player.dr.tetrsToGet = new Decimal(1)
        if (player.dr.tier.gte(player.dr.tetrReq) && hasUpgrade("le", 18)) {
            player.dr.tetrsToGet = tetrGain.sub(player.dr.tetr)
        }
        if (player.dr.tier.lt(player.dr.tetrReq) || player.dr.tetrsToGet.lt(0)) {
            player.dr.tetrsToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 21)) {
            player.dr.tetr = player.dr.tetr.add(player.dr.tetrsToGet)
        }

        let pentGain = player.dr.tetr.mul(player.dr.pentDiv).add(1).log(5)

        player.dr.pentEffect = Decimal.pow(5, player.dr.pent).pow(player.le.punchcardsEffect[16])
        player.dr.pentReq = layers.dr.getPentReq()

        player.dr.pentsToGet = new Decimal(1)
        if (player.dr.tetr.lt(player.dr.pentReq) || player.dr.pentsToGet.lt(0)) {
            player.dr.pentsToGet = new Decimal(0)
        }



        //points
        player.dr.rankPoints = player.dr.rankPoints.add(player.dr.rankPointsPerSecond.mul(delta))
        player.dr.rankPointsEffect = player.dr.rankPoints.pow(0.35).div(10).add(1)

        player.dr.rankPointsPerSecond = player.dr.rank.div(3).pow(1.3)
        player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(player.dr.tierPointsEffect)
        player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(player.dp.prestigePointsEffect)
        player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(buyableEffect("dg", 12))
        if (player.le.punchcards[3]) player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(player.le.punchcardsEffect[3])
        if (player.le.punchcards[6]) player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(player.le.punchcardsEffect[6])
        if (player.le.punchcards[14]) player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(player.le.punchcardsEffect[14])
        player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(buyableEffect("dgr", 15))
        player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(levelableEffect("st", 102)[0])
        if (player.pet.activeAbilities[0]) player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.pow(0.6)
        if (hasMilestone("db", 13)) player.dr.rankPointsPerSecond = player.dr.rankPointsPerSecond.mul(1000)


        player.dr.tierPoints = player.dr.tierPoints.add(player.dr.tierPointsPerSecond.mul(delta))   
        player.dr.tierPointsEffect = player.dr.tierPoints.pow(0.3).div(10).add(1)

        player.dr.tierPointsPerSecond = player.dr.tier.div(4).pow(1.25)
        player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(player.dr.tetrPointsEffect)
        player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(player.dp.prestigePointsEffect)
        player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(buyableEffect("dg", 12))
        if (player.le.punchcards[4]) player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(player.le.punchcardsEffect[4])
        if (player.le.punchcards[6]) player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(player.le.punchcardsEffect[6])
        if (player.le.punchcards[14]) player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(player.le.punchcardsEffect[14])
        player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(buyableEffect("dgr", 15))
        player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(levelableEffect("st", 103)[0])
        if (player.pet.activeAbilities[0]) player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.pow(0.6)
        if (hasMilestone("db", 13)) player.dr.tierPointsPerSecond = player.dr.tierPointsPerSecond.mul(100)


        player.dr.tetrPoints = player.dr.tetrPoints.add(player.dr.tetrPointsPerSecond.mul(delta))
        player.dr.tetrPointsEffect = player.dr.tetrPoints.pow(0.25).div(10).add(1)

        player.dr.tetrPointsPerSecond = player.dr.tetr.div(5).pow(1.2)
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.dr.pentPointsEffect)
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.dp.prestigePointsEffect)
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(buyableEffect("dg", 12))
        if (player.le.punchcards[5]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[5])
        if (player.le.punchcards[6]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[6])
        if (player.le.punchcards[14]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[14])
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(buyableEffect("dgr", 15))
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(levelableEffect("st", 104)[0])
        if (player.pet.activeAbilities[0]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.pow(0.6)
        if (hasMilestone("db", 13)) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(10)


        player.dr.pentPoints = player.dr.pentPoints.add(player.dr.pentPointsPerSecond.mul(delta))
        player.dr.pentPointsEffect = player.dr.pentPoints.pow(0.5).div(25).add(1)

        player.dr.pentPointsPerSecond = Decimal.pow(5, player.dr.pent).sub(1).div(5)
        player.dr.pentPointsPerSecond = player.dr.pentPointsPerSecond.mul(levelableEffect("st", 205)[0])

    },
    bars: {},
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: "100px", minHeight: "50px", color: "white", borderRadius: "10px", border: "2px solid #0d515a"  },
        },
        11: {
            title() {
                if (player.dr.rank.lte(20)) {
                    return "<h2>Reset dark celestial points, but rank up.</h2><br><h3>Req: " + format(player.dr.rankReq) + " Points</h3>"
                } else if (player.dr.rank.lte(100)) {
                    return "<h2>Reset dark celestial points, but rank up.</h2><br><h3>Req: " + format(player.dr.rankReq) + " Points<br><small style='color:red'>[SOFTCAPPED]</small></h3>"
                } else if (player.dr.rank.lte(1e50)) {
                    return "<h2>Reset dark celestial points, but rank up.</h2><br><h3>Req: " + format(player.dr.rankReq) + " Points<br><small style='color:red'>[SOFTCAPPED<sup>2</sup>]</small></h3>"
                } else {
                    return "<h2>Reset dark celestial points, but rank up.</h2><br><h3>Req: " + format(player.dr.rankReq) + " Points<br><small style='color:red'>[SOFTCAPPED<sup>3</sup>]</small></h3>"
                }
            },
            canClick() { return player.du.points.gte(player.dr.rankReq) && !hasUpgrade("le", 16) },
            unlocked() { return true },
            onClick() {
                player.dr.rank = player.dr.rank.add(player.dr.ranksToGet)
                layers.dr.rankReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", borderRadius: "0px 15px 0px 0px", color: "white", border: "2px solid #0d515a", margin: "-2px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title() { return "<h2>Reset dark celestial points and ranks, but tier up.</h2><br><h3>Req: " + formatWhole(player.dr.tierReq) + " Rank</h3>" },
            canClick() { return player.dr.rank.gte(player.dr.tierReq) && !hasUpgrade("le", 19) },
            unlocked() { return true },
            onClick() {
                player.dr.tier = player.dr.tier.add(player.dr.tiersToGet)
                layers.dr.tierReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", borderRadius: "0px", color: "white", border: "2px solid #0d515a", margin: "-2px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title() { return "<h2>Reset dark celestial points, ranks, and tiers, but tetr up.</h2><br><h3>Req: " + formatWhole(player.dr.tetrReq) + " Tier</h3>" },
            canClick() { return player.dr.tier.gte(player.dr.tetrReq) && !hasUpgrade("le", 21) },
            unlocked() { return true },
            onClick() {
                player.dr.tetr = player.dr.tetr.add(player.dr.tetrsToGet)
                layers.dr.tetrReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", color: "white", border: "2px solid #0d515a", margin: "-2px"}
                player.le.punchcards[16] ? look.borderRadius = "0px" : look.borderRadius = "0px 0px 15px 0px"
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
        14: {
            title() { return "<h2><small>Reset dark celestial points and previous rank content, but pent up.</small></h2><br><h3>Req: " + formatWhole(player.dr.pentReq) + " Tetr</h3>" },
            canClick() { return player.dr.tetr.gte(player.dr.pentReq) },
            unlocked() { return player.le.punchcards[16] },
            onClick() {
                player.dr.pent = player.dr.pent.add(player.dr.pentsToGet)
                layers.dr.pentReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", borderRadius: "0px 0px 15px 0px", color: "white", border: "2px solid #0d515a", margin: "-2px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
    },
    getRankReq() {
        if (player.dr.rank.lte(20)) {
            if (!hasUpgrade("le", 12)) return player.dr.rank.add(1).pow(1.45).mul(25).div(player.dr.rankDiv)
            if (hasUpgrade("le", 12)) return player.dr.rank.add(1).pow(1.45).mul(25).div(50).div(player.dr.rankDiv)
        } else if (player.dr.rank.gt(20) && player.dr.rank.lte(100)) {
            if (!hasUpgrade("le", 12)) return (player.dr.rank.sub(17)).pow(4).mul(25).div(player.dr.rankDiv)
            if (hasUpgrade("le", 12)) return (player.dr.rank.sub(17)).pow(4).mul(25).div(50).div(player.dr.rankDiv)
        } else if (player.dr.rank.gt(100) && player.dr.rank.lt(1e50)) {
            if (!hasUpgrade("le", 12)) return (player.dr.rank.sub(97)).pow(10).mul(25).div(player.dr.rankDiv)
            if (hasUpgrade("le", 12)) return (player.dr.rank.sub(97)).pow(10).mul(25).div(50).div(player.dr.rankDiv)
        } else if (player.dr.rank.gte(1e50)) {
            if (!hasUpgrade("le", 12)) return (player.dr.rank).pow(100).mul(25).div(player.dr.rankDiv)
            if (hasUpgrade("le", 12)) return (player.dr.rank).pow(100).mul(25).div(50).div(player.dr.rankDiv)
        }
    },
    getTierReq() {
        return player.dr.tier.add(1).pow(1.15).mul(5).div(player.dr.tierDiv).ceil()
    },
    getTetrReq() {
        return player.dr.tetr.add(1).pow(1.12).mul(4).div(player.dr.tetrDiv).ceil()
    },
    getPentReq() {
        return Decimal.pow(5, player.dr.pent.add(1)).sub(1).div(player.dr.pentDiv).ceil()
    },
    rankReset() {
        player.du.points = new Decimal(0)
        player.dr.ranksToGet = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
    },
    tierReset() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.ranksToGet = new Decimal(0)
        player.dr.tiersToGet = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
    },
    tetrReset() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.ranksToGet = new Decimal(0)
        player.dr.tiersToGet = new Decimal(0)
        player.dr.tetrsToGet = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
    },
    pentReset() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)
        player.dr.ranksToGet = new Decimal(0)
        player.dr.tiersToGet = new Decimal(0)
        player.dr.tetrsToGet = new Decimal(0)
        player.dr.pentsToGet = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
        player.dr.pentPoints = new Decimal(0)
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #0d515a", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", function () { return "Rank " + formatWhole(player.dr.rank) + " (+" + formatWhole(player.dr.ranksToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.rankEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "399px", height: "53px", borderBottom: "2px solid #0d515a"}],
                            ["style-column", [
                                ["raw-html", function () { return formatWhole(player.dr.rankPoints) + " Rank Points (+" + formatWhole(player.dr.rankPointsPerSecond) + "/s)"}, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.rankPointsEffect) + " Points" }, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "399px", height: "45px", backgroundColor: "#03181b"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 11],
                    ], {width: "800px", height: "100px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderBottom: "0px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", function () { return "Tier " + formatWhole(player.dr.tier) + " (+" + formatWhole(player.dr.tiersToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.tierEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "399px", height: "53px", borderBottom: "2px solid #0d515a"}],
                            ["style-column", [
                                ["raw-html", function () { return formatWhole(player.dr.tierPoints) + " Tier Points (+" + formatWhole(player.dr.tierPointsPerSecond) + "/s)"}, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.tierPointsEffect) + " Rank Points" }, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "399px", height: "45px", backgroundColor: "#03181b"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 12],
                    ], {width: "800px", height: "100px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderBottom: "0px", borderRadius: "0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", function () { return "Tetr " + formatWhole(player.dr.tetr) + " (+" + formatWhole(player.dr.tetrsToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.tetrEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "399px", height: "53px", borderBottom: "2px solid #0d515a"}],
                            ["style-column", [
                                ["raw-html", function () { return formatWhole(player.dr.tetrPoints) + " Tetr Points (+" + formatWhole(player.dr.tetrPointsPerSecond) + "/s)"}, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.tetrPointsEffect) + " Tier Points" }, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],    
                            ], () => {return player.le.punchcards[16] ? {width: "399px", height: "45px", backgroundColor: "#03181b", borderRadius: "0px"} : {width: "399px", height: "45px", backgroundColor: "#03181b", borderRadius: "0px 0px 0px 13px"}}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 13],
                    ], () => {return player.le.punchcards[16] ? {width: "800px", height: "100px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderBottom: "0px", borderRadius: "0px"} : {width: "800px", height: "100px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderRadius: "0px 0px 15px 15px"}}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", function () { return "Pent " + formatWhole(player.dr.pent) + " (+" + formatWhole(player.dr.pentsToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.pentEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "399px", height: "53px", borderBottom: "2px solid #0d515a"}],
                            ["style-column", [
                                ["raw-html", function () { return formatWhole(player.dr.pentPoints) + " Pent Points (+" + formatWhole(player.dr.pentPointsPerSecond) + "/s)"}, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "x" + format(player.dr.pentPointsEffect) + " Tetr Points" }, {color: "#cccccc", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "399px", height: "45px", backgroundColor: "#03181b", borderRadius: "0px 0px 0px 13px"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 14],
                    ], () => {return player.le.punchcards[16] ? {width: "800px", height: "100px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderRadius: "0px 0px 15px 15px"} : {display: "none !important"} }],
                    ["style-column", [
                        ["raw-html", function () { return "Total Mult: x" + format(player.dr.rankEffect.mul(player.dr.tierEffect).mul(player.dr.tetrEffect).mul(player.dr.pentEffect).mul(player.dr.rankPointsEffect)) }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "400px", height: "50px", backgroundColor: "#06282d", border: "2px solid #0d515a", borderTop: "0px", borderRadius: "0px 0px 15px 15px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", function () { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, { "color": "#FEEF5F", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("le", 11) }
})