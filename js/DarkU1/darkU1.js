var treeD = [["le"], ["dr", "dp"], ["dg", "db", "dgr"], ["dn", "dv"]]
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
    }},
    automate() {},
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
        if (hasUpgrade("sma", 10)) player.du.pointGain = player.du.pointGain.mul(upgradeEffect("sma", 10))
        player.du.pointGain = player.du.pointGain.mul(player.dr.rankEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.tierEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.tetrEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.pentEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dr.rankPointsEffect)
        player.du.pointGain = player.du.pointGain.mul(player.dg.generatorPowerEffect)
        player.du.pointGain = player.du.pointGain.mul(buyableEffect("dg", 11))
        if (hasUpgrade("sma", 13)) player.du.pointGain = player.du.pointGain.mul(upgradeEffect("sma", 13))
        if (getLevelableBool("pu", 101)) player.du.pointGain = player.du.pointGain.mul(levelableEffect("pu", 101)[0])
        if (getLevelableBool("pu", 101)) player.du.pointGain = player.du.pointGain.mul(levelableEffect("pu", 101)[1])
        if (getLevelableBool("pu", 203)) player.du.pointGain = player.du.pointGain.mul(levelableEffect("pu", 203)[0])
        if (getLevelableBool("pu", 301)) player.du.pointGain = player.du.pointGain.mul(levelableEffect("pu", 301)[0])
        player.du.pointGain = player.du.pointGain.mul(buyableEffect("dgr", 14))
        player.du.pointGain = player.du.pointGain.mul(levelableEffect("st", 101)[0])
        player.du.pointGain = player.du.pointGain.mul(player.db.boosterEffect)
        if (hasMilestone("db", 12)) player.du.pointGain = player.du.pointGain.mul(player.db.milestone2Effect)

        player.du.pointGain = player.du.pointGain.div(player.du.pointSoftcap)

        if (player.du.pointGain.gte(player.du.secondSoftcapStart)) player.du.pointGain = player.du.pointGain.div(player.du.secondSoftcapStart).pow(player.du.pointSoftcap2).mul(player.du.secondSoftcapStart)
        if (player.pet.activeAbilities[0]) player.du.pointGain = player.du.pointGain.pow(0.7)
        if (player.sma.inStarmetalChallenge) {
            player.du.points = player.du.points.add(player.du.pointGain.mul(delta))
        }

        // SOFTCAP
        if (player.du.points.lte(1e10)) player.du.pointSoftcap = player.du.points.pow(0.15).div(10).add(1).pow(levelableEffect("st", 201)[0])
        if (player.du.points.lte(1e10) && getLevelableBool("pu", 201)) player.du.pointSoftcap = player.du.points.pow(0.15).div(10).div(levelableEffect("pu", 201)[1]).add(1).pow(levelableEffect("pu", 201)[0]).pow(levelableEffect("st", 201)[0])
        if (player.du.points.gt(1e10)) player.du.pointSoftcap = player.du.points.pow(0.30).div(15).add(1).pow(levelableEffect("st", 201)[0])
        if (player.du.points.gt(1e10) && getLevelableBool("pu", 201)) player.du.pointSoftcap = player.du.points.pow(0.30).div(15).div(levelableEffect("pu", 201)[1]).add(1).pow(levelableEffect("pu", 201)[0]).pow(levelableEffect("st", 201)[0])

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
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge},
    deactivated() { return !player.sma.inStarmetalChallenge},
})