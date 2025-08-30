addLayer("ar", {
    name: "Alternate Ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AR", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        rankPoints: new Decimal(0),
        rankPointsToGet: new Decimal(0),
        rankPointsPerSec: new Decimal(0),
        rankPointsEffect: new Decimal(0),

        tierPoints: new Decimal(0),
        tierPointsToGet: new Decimal(0),
        tierPointsPerSec: new Decimal(0),
        tierPointsEffect: new Decimal(1),

        tetrPoints: new Decimal(0),
        tetrPointsToGet: new Decimal(0),
        tetrPointsPerSec: new Decimal(0),
        tetrPointsEffect: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Alternate Ranks",
    color: "#1486ff",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ar.rankPointsToGet = player.cp.replicantiPoints.sub(1).pow(0.35)
        player.ar.rankPointsEffect = player.ar.rankPoints.pow(0.45).mul(0.005)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.ar.tierPointsEffect)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(buyableEffect("pr", 13))
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.ar.tetrPointsEffect)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.gs.grassSkippersEffect)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(buyableEffect("fu", 21))
        if (inChallenge("fu", 11)) player.ar.rankPointsToGet = player.ar.rankPointsToGet.pow(0.2)

        player.ar.rankPointsPerSec = new Decimal(0)
        if (hasUpgrade("an", 13)) player.ar.rankPointsPerSec = player.ar.rankPointsPerSec.add(0.05)
        if (hasUpgrade("an", 15)) player.ar.rankPointsPerSec = player.ar.rankPointsPerSec.add(0.25)
        if (hasUpgrade("an", 18)) player.ar.rankPointsPerSec = player.ar.rankPointsPerSec.add(1)
        if (hasMilestone("gs", 19)) player.ar.rankPointsPerSec = player.ar.rankPointsPerSec.add(5)
        player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet.mul(Decimal.mul(delta, player.ar.rankPointsPerSec)))


        player.ar.tierPointsToGet = player.ar.rankPoints.mul(0.1).pow(0.4)
        player.ar.tierPointsEffect = player.ar.tierPoints.pow(0.65).add(1)
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(buyableEffect("pr", 14))
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(player.ar.tetrPointsEffect)
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(player.gs.grassSkippersEffect)
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(buyableEffect("fu", 21))
        if (inChallenge("fu", 11)) player.ar.tierPointsToGet = player.ar.tierPointsToGet.pow(0.2)

        player.ar.tierPointsPerSec = new Decimal(0)
        if (hasUpgrade("an", 15)) player.ar.tierPointsPerSec = player.ar.tierPointsPerSec.add(0.05)
        if (hasUpgrade("an", 18)) player.ar.tierPointsPerSec = player.ar.tierPointsPerSec.add(0.25)
        if (hasMilestone("gs", 19)) player.ar.tierPointsPerSec = player.ar.tierPointsPerSec.add(5)
        player.ar.tierPoints = player.ar.tierPoints.add(player.ar.tierPointsToGet.mul(Decimal.mul(delta, player.ar.tierPointsPerSec)))


        player.ar.tetrPointsToGet = player.ar.tierPoints.mul(0.1).pow(0.4)
        player.ar.tetrPointsEffect = player.ar.tetrPoints.pow(0.5).add(1)
        player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.mul(buyableEffect("rg", 16))
        player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.mul(player.gs.grassSkippersEffect)
        player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.mul(buyableEffect("fu", 21))
        if (inChallenge("fu", 11)) player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.pow(0.2)

        player.ar.tetrPointsPerSec = new Decimal(0)
        if (hasUpgrade("an", 18)) player.ar.tetrPointsPerSec = player.ar.tetrPointsPerSec.add(0.05)
        if (hasMilestone("gs", 19)) player.ar.tetrPointsPerSec = player.ar.tetrPointsPerSec.add(5)
        player.ar.tetrPoints = player.ar.tetrPoints.add(player.ar.tetrPointsToGet.mul(Decimal.mul(delta, player.ar.tetrPointsPerSec)))

    },
    clickables: {
        11: {
            title() { return "<h2>Gain " + format(player.ar.rankPointsToGet) + " rank points</h2><br><h3>But reset replicanti points<br><small>(Based on Replicanti Points)</small></h3>" },
            canClick() { return player.ar.rankPointsToGet.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: {width: "406px", minHeight: "80.7px", borderRadius: "0px 15px 0px 0px", color: "black", border: "3px solid #0c1a36", margin: "-3px"},
        },
        12: {
            title() { return "<h2>Gain " + format(player.ar.tierPointsToGet) + " tier points</h2><br><h3>But reset <small>replicanti points and rank points</small><br><small>(Based on Rank Points)</small></h3>" },
            canClick() { return player.ar.tierPointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.ar.tierPoints = player.ar.tierPoints.add(player.ar.tierPointsToGet)
                player.ar.rankPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style() {return hasUpgrade("cp", 13) ? {width: "406px", minHeight: "80.7px", borderRadius: "0px", color: "black", border: "3px solid #0c1a36", margin: "-3px"} : {width: "406px", minHeight: "80.7px", borderRadius: "0px 0px 15px 0px", color: "black", border: "3px solid #0c1a36", margin: "-3px"} },
        },
        13: {
            title() { return "<h2>Gain " + format(player.ar.tetrPointsToGet) + " tetr points</h2><br><h3>But reset <small>replicanti rank and tier points</small><br><small>(Based on Tier Points)</small></h3>" },
            canClick() { return player.ar.tetrPointsToGet.gte(1) },
            unlocked() { return hasUpgrade("cp", 13) },
            onClick() {
                player.ar.tetrPoints = player.ar.tetrPoints.add(player.ar.tetrPointsToGet)
                player.ar.tierPoints = new Decimal(0)
                player.ar.rankPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: {width: "406px", minHeight: "80.7px", borderRadius: "0px 0px 15px 0px", color: "black", border: "3px solid #0c1a36", margin: "-3px"},
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
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return format(player.ar.rankPoints) + " Rank Points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", function () { return player.ar.rankPointsPerSec.gt(0) ? "(+" + formatWhole(player.ar.rankPointsToGet.mul(player.ar.rankPointsPerSec)) + "/s)" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "+" + format(player.ar.rankPointsEffect) + "x Replicanti Point Mult" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],    
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 11],
                    ], {width: "800px", height: "75px", backgroundColor: "#162e5e", border: "3px solid #0c1a36", borderBottom: "0px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return format(player.ar.tierPoints) + " Tier Points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", function () { return player.ar.tierPointsPerSec.gt(0) ? "(+" + formatWhole(player.ar.tierPointsToGet.mul(player.ar.tierPointsPerSec)) + "/s)" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.ar.tierPointsEffect) + " Rank Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],    
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 12],
                    ], () => {return hasUpgrade("cp", 13) ? {width: "800px", height: "75px", backgroundColor: "#162e5e", border: "3px solid #0c1a36", borderBottom: "0px", borderRadius: "0px"} : {width: "800px", height: "75px", backgroundColor: "#162e5e", border: "3px solid #0c1a36", borderRadius: "0px 0px 15px 15px"}}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return format(player.ar.tetrPoints) + " Tetr Points (+" + format(player.ar.tetrPointsToGet) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", function () { return player.ar.tetrPointsPerSec.gt(0) ? "(+" + formatWhole(player.ar.tetrPointsToGet.mul(player.ar.tetrPointsPerSec)) + "/s)" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.ar.tetrPointsEffect) + " Rank and Tier Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],    
                        ], {width: "399px", height: "75px", borderRadius: "0px 0px 0px 13px"}],
                        ["clickable", 13],
                    ], () => {return hasUpgrade("cp", 13) ? {width: "800px", height: "75px", backgroundColor: "#162e5e", border: "3px solid #0c1a36", borderRadius: "0px 0px 15px 15px"} : {display: "none !important"}}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 11) }
})

// hai icecreamdude-senpai :3
