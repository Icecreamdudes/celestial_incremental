
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
        tier: new Decimal(0),
        tierReq: new Decimal(3), //Ranks
        tierEffect: new Decimal(1),
        tiersToGet: new Decimal(0),
        tetr: new Decimal(0),
        tetrReq: new Decimal(2), //Tiers
        tetrEffect: new Decimal(1),
        tetrsToGet: new Decimal(0),

        rankPoints: new Decimal(0),
        rankPointsEffect: new Decimal(1),
        rankPointsPerSecond: new Decimal(0),

        tierPoints: new Decimal(0),
        tierPointsEffect: new Decimal(1),
        tierPointsPerSecond: new Decimal(0),

        tetrPoints: new Decimal(0),
        tetrPointsEffect: new Decimal(1),
        tetrPointsPerSecond: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #175f69 0%, #0d385e 50%, #041440 100%)",
            "background-origin": "border-box",
            "border-color": "#1ba2b5",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Ranks",
    branches: ["le"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

                //Rank and Tier effects/costs
        let ranksGainPreS = player.du.points.div(25).mul(buyableEffect("dp", 11)).pow(Decimal.div(20, 29)).floor()
        if (hasUpgrade("le", 12)) ranksGainPreS = player.du.points.div(25).mul(50).mul(buyableEffect("dp", 11)).pow(Decimal.div(20, 29)).floor()
        let ranksGainPostS = player.du.points.div(25).mul(buyableEffect("dp", 11)).pow(0.25).floor()
        if (hasUpgrade("le", 12)) ranksGainPostS =  player.du.points.div(25).mul(50).mul(buyableEffect("dp", 11)).pow(0.25).floor()
        let ranksGainPostS2 = player.du.points.div(25).mul(buyableEffect("dp", 11)).pow(Decimal.div(1, 10)).floor()
        if (hasUpgrade("le", 12)) ranksGainPostS2 = player.du.points.div(25).mul(50).mul(buyableEffect("dp", 11)).pow(Decimal.div(1, 10)).floor()

        if (!hasUpgrade("sma", 11)) player.dr.rankEffect = player.dr.rank.mul(0.3).add(1).pow(1.055)
        if (hasUpgrade("sma", 11)) player.dr.rankEffect = player.dr.rank.mul(0.5).add(1).pow(1.08)
        if (player.le.punchcards[3]) player.dr.rankEffect = player.dr.rank.mul(0.7).add(1).pow(1.12)
        player.dr.rankReq = layers.dr.getRankReq()
        if (!hasUpgrade("le", 14)) player.dr.ranksToGet = new Decimal(1)


        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).lte(20) && hasUpgrade("le", 14))
        {
            player.dr.ranksToGet = ranksGainPreS.sub(player.dr.rank)
        }
        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).gt(20) && hasUpgrade("le", 14))
        {
            player.dr.ranksToGet = ranksGainPostS.sub(player.dr.rank).add(18)
        }
        if (player.du.points.gte(player.dr.rankReq) && player.dr.rank.add(player.dr.ranksToGet).gt(100) && hasUpgrade("le", 14))
        {
            player.dr.ranksToGet = ranksGainPostS2.sub(player.dr.rank).add(98)
        }
        if (player.du.points.lt(player.dr.rankReq) || player.dr.ranksToGet.lt(0))
        {
            player.dr.ranksToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 16))
        {
            player.dr.rank = player.dr.rank.add(player.dr.ranksToGet)
        }

        let tiersGain = player.dr.rank.div(5).mul(buyableEffect("dp", 12)).pow(Decimal.div(20, 23)).floor()

        if (!hasUpgrade("sma", 11)) player.dr.tierEffect = player.dr.tier.mul(0.4).add(1).pow(1.1)
        if (hasUpgrade("sma", 11)) player.dr.tierEffect = player.dr.tier.mul(0.65).add(1).pow(1.15)
        if (player.le.punchcards[4]) player.dr.tierEffect = player.dr.tier.mul(0.8).add(1).pow(1.22)
        player.dr.tierReq = layers.dr.getTierReq()

        if (!hasUpgrade("le", 15)) player.dr.tiersToGet = new Decimal(1)
        if (player.dr.rank.gte(player.dr.tierReq) && hasUpgrade("le", 15))
        {
            player.dr.tiersToGet = tiersGain.sub(player.dr.tier)
        }
        if (player.dr.tiersToGet.lt(0) || player.dr.rank.lt(player.dr.tierReq))
        {
            player.dr.tiersToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 19))
        {
            player.dr.tier = player.dr.tier.add(player.dr.tiersToGet)
        }

        let tetrGain = player.dr.tier.div(4).mul(buyableEffect("dp", 13)).pow(Decimal.div(25, 28)).floor()

        player.dr.tetrEffect = player.dr.tetr.add(1).pow(1.2)
        if (player.le.punchcards[5]) player.dr.tetrEffect = player.dr.tetr.mul(1.5).add(1).pow(1.3)
        player.dr.tetrReq = layers.dr.getTetrReq()
        player.dr.tetrReq = player.dr.tetrReq.div(buyableEffect("dp", 13)).floor()
        if (!hasUpgrade("le", 18)) player.dr.tetrsToGet = new Decimal(1)
        if (player.dr.tier.gte(player.dr.tetrReq) && hasUpgrade("le", 18))
        {
            player.dr.tetrsToGet = tetrGain.sub(player.dr.tetr)
        }
        if (player.dr.tier.lt(player.dr.tetrReq) || player.dr.tetrsToGet.lt(0))
        {
            player.dr.tetrsToGet = new Decimal(0)
        }
        if (hasUpgrade("le", 21))
        {
            player.dr.tetr = player.dr.tetr.add(player.dr.tetrsToGet)
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


        player.dr.tetrPoints = player.dr.tetrPoints.add(player.dr.tetrPointsPerSecond.mul(delta))
        player.dr.tetrPointsEffect = player.dr.tetrPoints.pow(0.25).div(10).add(1)
        player.dr.tetrPointsPerSecond = player.dr.tetr.div(5).pow(1.2)
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.dp.prestigePointsEffect)
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(buyableEffect("dg", 12))
        if (player.le.punchcards[5]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[5])
        if (player.le.punchcards[6]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[6])
        if (player.le.punchcards[14]) player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(player.le.punchcardsEffect[14])
        player.dr.tetrPointsPerSecond = player.dr.tetrPointsPerSecond.mul(buyableEffect("dgr", 15))


    },
    bars: {
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: '100px', "min-height": '50px', color: "white"  },
        },
        11: {
            title() { return "<h2>Reset dark celestial points, but rank up.<br>Req: " + format(player.dr.rankReq) + " Points" },
            canClick() { return player.du.points.gte(player.dr.rankReq) },
            unlocked() { return true },
            onClick() {
                player.dr.rank = player.dr.rank.add(player.dr.ranksToGet)
                layers.dr.rankReset()
            },
            style: { width: '400px', "min-height": '100px', color: "white" },
        },
        12: {
            title() { return "<h2>Reset dark celestial points and ranks, but tier up.<br>Req: " + formatWhole(player.dr.tierReq) + " Rank" },
            canClick() { return player.dr.rank.gte(player.dr.tierReq) },
            unlocked() { return true },
            onClick() {
                player.dr.tier = player.dr.tier.add(player.dr.tiersToGet)
                layers.dr.tierReset()
            },
            style: { width: '400px', "min-height": '100px', color: "white" },
        },
        13: {
            title() { return "<h2>Reset dark celestial points, ranks, and tiers, but tetr up.<br>Req: " + formatWhole(player.dr.tetrReq) + " Tier" },
            canClick() { return player.dr.tier.gte(player.dr.tetrReq) },
            unlocked() { return true },
            onClick() {
                player.dr.tetr = player.dr.tetr.add(player.dr.tetrsToGet)
                layers.dr.tetrReset()
            },
            style: { width: '400px', "min-height": '100px', color: "white" },
        },
    },
    getRankReq()
    {
        if (player.dr.rank.lte(20))
        {
            if (!hasUpgrade("le", 12)) return player.dr.rank.add(1).pow(1.45).mul(25).div(buyableEffect("dp", 11))
            if (hasUpgrade("le", 12)) return player.dr.rank.add(1).pow(1.45).mul(25).div(50).div(buyableEffect("dp", 11))
        } else if (player.dr.rank.gt(20) && player.dr.rank.lt(100))
        {
            if (!hasUpgrade("le", 12)) return (player.dr.rank.sub(17)).pow(4).mul(25).div(buyableEffect("dp", 11))
            if (hasUpgrade("le", 12)) return (player.dr.rank.sub(17)).pow(4).mul(25).div(50).div(buyableEffect("dp", 11))
        }
        else if (player.dr.rank.gt(100))
        {
            if (!hasUpgrade("le", 12)) return (player.dr.rank.sub(97)).pow(10).mul(25).div(buyableEffect("dp", 11))
            if (hasUpgrade("le", 12)) return (player.dr.rank.sub(97)).pow(10).mul(25).div(50).div(buyableEffect("dp", 11))
        }
    },
    getTierReq()
    {
        return player.dr.tier.add(1).mul(5).pow(1.15).div(buyableEffect("dp", 12)).floor()
    },
    getTetrReq()
    {
        return player.dr.tetr.add(1).mul(4).pow(1.12).floor().add(1)
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
    upgrades: {

    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {

    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.dr.rank.lte(20) ? "You are at rank <h3>" + formatWhole(player.dr.rank) + ". (+" + formatWhole(player.dr.ranksToGet) + ")"  : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.dr.rank.gt(20) ? "You are at rank <h3>" + formatWhole(player.dr.rank) +  ". (+" + formatWhole(player.dr.ranksToGet) + "). \n<h6>(softcapped)"  : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your rank boosts points by x" + format(player.dr.rankEffect) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are at tier <h3>" + formatWhole(player.dr.tier) + ". (+" + formatWhole(player.dr.tiersToGet) + ")"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your tier boosts points by x" + format(player.dr.tierEffect) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are at tetr <h3>" + formatWhole(player.dr.tetr) + ". (+" + formatWhole(player.dr.tetrsToGet) + ")" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your tetr boosts points by x" + format(player.dr.tetrEffect) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 13]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(player.dr.rankEffect.mul(player.dr.tierEffect.mul(player.dr.tetrEffect))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]

            },
            "Points": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.dr.rankPoints) + "</h3> rank points, which boost point gain by x<h3>" + format(player.dr.rankPointsEffect) + "</h3>." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.dr.rankPointsPerSecond) + "</h3> rank points per second. (based on rank)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.dr.tierPoints) + "</h3> tier points, which boost rank point gain by x<h3>" + format(player.dr.tierPointsEffect) + "</h3>."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.dr.tierPointsPerSecond) + "</h3> tier points per second. (based on tier)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.dr.tetrPoints) + "</h3> tetr points, which boost tier point gain by x<h3>" + format(player.dr.tetrPointsEffect) + "</h3>."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.dr.tetrPointsPerSecond) + "</h3> tetr points per second. (based on tetr)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 13]]],
                    ["blank", "25px"],
                ]

            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 11) }
})