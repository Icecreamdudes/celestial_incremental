var treeD = [["le", "dr", "dp"], ["dg", "dgr", "dn"]]


addLayer("du", {
    name: "Dark Universe I: Abscence of Light", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        points: new Decimal(0),
        pointSoftcap: new Decimal(1),
        pointSoftcap2: new Decimal(0.1),
        secondSoftcapStart: new Decimal(1.79e308),
        pointGain: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
            "background-origin": "border-box",
            "border-color": "#151515",
        };
    },
    tooltip: "Dark Universe 1 - Abscence of Light",
    branches: ["in"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.sma.inStarmetalChallenge && (player.tab == "i" || player.tab == "in" || player.tab == "s" || player.tab == "cp")) {
            player.tab = "du"
        } 

        //Celestial Point boosts
        player.du.pointGain = new Decimal(1)
        if (hasUpgrade("sma", 10)) player.du.pointGain = player.du.pointGain.mul(2)
        player.du.pointGain = player.du.pointGain.mul(player.dr.rankEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.tierEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.tetrEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.pentEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.rankPointsEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dg.generatorPowerEffect)
        player.du.pointGain = player.du.pointGain.mul(buyableEffect("dg", 11))
        if (hasUpgrade("sma", 13)) player.du.pointGain = player.du.pointGain.mul(upgradeEffect("sma", 13))
        if (player.le.punchcards[0]) player.du.pointGain = player.du.pointGain.mul(player.le.punchcardsEffect[0])
        if (player.le.punchcards[9]) player.du.pointGain = player.du.pointGain.mul(player.le.punchcardsEffect[9])
        if (player.le.punchcards[14]) player.du.pointGain = player.du.pointGain.mul(player.le.punchcardsEffect[14])
        player.du.pointGain = player.du.pointGain.mul(buyableEffect("dgr", 14))

        player.du.pointGain = player.du.pointGain.div(player.du.pointSoftcap)
        if (player.du.pointGain.gte(player.du.secondSoftcapStart)) player.du.pointGain = player.du.pointGain.div(player.du.secondSoftcapStart).pow(player.du.pointSoftcap2).mul(player.du.secondSoftcapStart)
        if (player.sma.inStarmetalChallenge) {
            player.du.points = player.du.points.add(player.du.pointGain.mul(delta))
        }
        player.dgr.grass.div(1e100).add(1).log(100).mul(0.05).add(7)

        // SOFTCAP
        if (player.du.points.lte(1e10)) player.du.pointSoftcap = player.du.points.pow(0.15).div(10).add(1)
        if (player.du.points.lte(1e10) && player.le.punchcards[1]) player.du.pointSoftcap = player.du.points.pow(0.15).div(10).add(1).pow(player.le.punchcardsEffect[1])
        if (player.du.points.gt(1e10)) player.du.pointSoftcap = player.du.points.pow(0.30).div(15).add(1)
        if (player.du.points.gt(1e10) && player.le.punchcards[1]) player.du.pointSoftcap = player.du.points.pow(0.30).div(15).add(1).pow(player.le.punchcardsEffect[1])

        // SOFTCAP 2
        player.du.pointSoftcap2 = new Decimal(0.1)

        // PLACE ANY BASE MODIFIERS TO SOFTCAP2 BEFORE SCALING
        player.du.pointSoftcap2 = player.du.pointSoftcap2.div(player.du.pointGain.div(player.du.secondSoftcapStart).add(1).log(player.du.secondSoftcapStart).add(1))

        // SOFTCAP 2 STARTING VARIABLE
        player.du.secondSoftcapStart = new Decimal(1.79e308)
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["tree", treeD],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge },
    deactivated() { return !player.sma.inStarmetalChallenge},
})