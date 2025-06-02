var tree = [["hexPr"], ["hexRe"], ["hexBl", "hexCu"], ["hexPw"]]
addNode("hexPr", {
    symbol: "Pr", // Decides what text appears on the node.
    tooltip: "Provenance", // Decides the nodes tooltip
    color: "#0061ff", // Decides the nodes color.
    nodeStyle: {width: "70px", height: "70px", borderRadius: "50%", margin: "5px 10px 5px 10px"}, // Decides the nodes style, in CSS format.
    canClick() { return true }, // Decides whether you can click on the node or not.
    onClick() {
        player.subtabs["h"]["hexes"] = "Provenance"
    }, // Decides what happens when you click on the node.
    layerShown() { return true }, // Decides if this node is shown or not.
});
addNode("hexRe", {
    symbol: "Re", // Decides what text appears on the node.
    tooltip: "Refinement", // Decides the nodes tooltip
    color: "black", // Decides the nodes color.
    nodeStyle: {width: "70px", height: "70px", borderColor: "#ccc", color: "#ccc", borderRadius: "50%", margin: "5px 10px 5px 10px"}, // Decides the nodes style, in CSS format.
    branches: ["hexPr"], // Decides the nodes branches.
    canClick() { return true }, // Decides whether you can click on the node or not.
    onClick() {
        player.subtabs["h"]["hexes"] = "Refinement"
    }, // Decides what happens when you click on the node.
    layerShown() { return true }, // Decides if this node is shown or not.
});
addNode("hexBl", {
    symbol: "Bl", // Decides what text appears on the node.
    tooltip: "Blessings", // Decides the nodes tooltip
    color: "#ffbf00", // Decides the nodes color.
    nodeStyle: {width: "70px", height: "70px", borderRadius: "50%", margin: "5px 10px 5px 10px"}, // Decides the nodes style, in CSS format.
    branches: ["hexRe"], // Decides the nodes branches.
    canClick() { return true }, // Decides whether you can click on the node or not.
    onClick() {
        player.subtabs["h"]["hexes"] = "Blessings"
    }, // Decides what happens when you click on the node.
    layerShown() { return hasChallenge("ip", 13) }, // Decides if this node is shown or not.
});
addNode("hexCu", {
    symbol: "Cu", // Decides what text appears on the node.
    tooltip: "Curses", // Decides the nodes tooltip
    color: "#b2d8d8", // Decides the nodes color.
    nodeStyle: {width: "70px", height: "70px", borderRadius: "50%", margin: "5px 10px 5px 10px"}, // Decides the nodes style, in CSS format.
    branches: ["hexBl"], // Decides the nodes branches.
    canClick() { return true }, // Decides whether you can click on the node or not.
    onClick() {
        player.subtabs["h"]["hexes"] = "Curses"
    }, // Decides what happens when you click on the node.
    layerShown() { return hasUpgrade("ta", 16) }, // Decides if this node is shown or not.
});
addNode("hexPw", {
    symbol: "Pw", // Decides what text appears on the node.
    tooltip: "Power", // Decides the nodes tooltip
    color: "#ff5555", // Decides the nodes color.
    nodeStyle: {width: "70px", height: "70px", borderColor: "#5e0000", borderRadius: "50%", margin: "5px 10px 5px 10px"}, // Decides the nodes style, in CSS format.
    branches: ["hexBl"], // Decides the nodes branches.
    canClick() { return true }, // Decides whether you can click on the node or not.
    onClick() {
        player.subtabs["h"]["hexes"] = "Power"
    }, // Decides what happens when you click on the node.
    layerShown() { return hasUpgrade("ta", 16) }, // Decides if this node is shown or not.
});
addLayer("h", {
    name: "Hex", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // Hex Points
        hexPoint: new Decimal(0),
        hexPointGain: new Decimal(0),

        // Hex of Provenance
        HPRrank: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        HPRrankReq: [new Decimal(60), new Decimal(6), new Decimal(36), new Decimal(216), new Decimal(1296), new Decimal(7776)],
        HPRrankGain: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        HPRrankEffect: [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]],
        HPRdivider: new Decimal(1),

        // Hex of Refinement
        HRErefinement: new Decimal(0),
        HRErefinementReq: new Decimal(0),
        HRErefinementGain: new Decimal(0),
        HRErefinementDiv: new Decimal(1),
        HRErefinementEffect: [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]],

        // Hex of Blessings
        HBLblessings: new Decimal(0),
        HBLblessingsGain: new Decimal(0),
        HBLboons: new Decimal(0),
        HBLboonsGain: new Decimal(0),

        HBLboonLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        HBLboonXP: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        HBLboonReq: [new Decimal(6), new Decimal(12), new Decimal(36), new Decimal(600), new Decimal(3600), new Decimal(21600)],
        HBLboonEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)],

        // Hex of Curses
        HCUcurses: new Decimal(0),
        HCUcursesGain: new Decimal(0),
        HCUjinxTotal: new Decimal(0),
        HCUjinxAddCap: new Decimal(0),

        // Hex of Power
        HPWpower: new Decimal(0),
        HPWpowerGain: new Decimal(0),

        ragePower: new Decimal(1),
    }},
    automate() {},
    nodeStyle() { return {color: "white", backgroundColor: "black", borderColor: "#0061ff"}},
    glowColor: "rgba(0, 0, 0, 0)",
    tooltip: "Hex",
    color: "#d4d4d4",
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF HEX POINT GAIN
        if (!hasChallenge("ip", 13)) player.h.hexPointGain = new Decimal(6)
        if (hasChallenge("ip", 13)) player.h.hexPointGain = player.points.add(1).log(60).pow(0.6)
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[0][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[1][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[2][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[3][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[4][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HPRrankEffect[5][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HRErefinementEffect[0][0])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.d.diceEffects[14])
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("cb", 11))
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.HBLboonEffects[0])
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("h", 107))
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("ta", 48))
        if (hasUpgrade("h", 102)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("h", 102))

        // HEX POINT PER SECOND FORMULA
        player.h.hexPoint = player.h.hexPoint.add(player.h.hexPointGain.mul(delta))

        // HEX OF PROVENANCE CALCULATIONS
        player.h.HPRdivider = player.h.HRErefinementEffect[1][0]

        if (player.h.HPRrank[0].lt(1200)) player.h.HPRrankReq[0] = layers.h.hexReq(player.h.HPRrank[0], 60, 1.6, player.h.HPRdivider)
        if (player.h.HPRrank[0].gte(1200) && player.h.HPRrank[0].lt(6000000)) player.h.HPRrankReq[0] = layers.h.hexReq(player.h.HPRrank[0], 60, 2.4, player.h.HPRdivider, -1087)
        if (player.h.HPRrank[0].gte(6000000)) player.h.HPRrankReq[0] = layers.h.hexReq(player.h.HPRrank[0], 60, 6, player.h.HPRdivider, new Decimal(-5999485))
        if (player.h.hexPoint.lt(Decimal.div(5074814, player.h.HPRdivider))) player.h.HPRrankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 1.6, player.h.HPRdivider).sub(player.h.HPRrank[0])
        if (player.h.hexPoint.gte(Decimal.div(5074814, player.h.HPRdivider)) && player.h.hexPoint.lt(Decimal.div(1.11e18, player.h.HPRdivider))) player.h.HPRrankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 2.4, player.h.HPRdivider).sub(player.h.HPRrank[0]).add(1088)
        if (player.h.hexPoint.gte(Decimal.div(1.11e18, player.h.HPRdivider))) player.h.HPRrankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 6, player.h.HPRdivider).sub(player.h.HPRrank[0]).add(5999486)
        

        player.h.HPRrankReq[1] = layers.h.hexReq(player.h.HPRrank[1], 6, 1.5, player.h.HPRdivider)
        player.h.HPRrankGain[1] = layers.h.hexGain(player.h.HPRrank[0], 6, 1.5, player.h.HPRdivider).sub(player.h.HPRrank[1])

        player.h.HPRrankReq[2] = layers.h.hexReq(player.h.HPRrank[2], 36, 1.4, player.h.HPRdivider)
        player.h.HPRrankGain[2] = layers.h.hexGain(player.h.HPRrank[1], 36, 1.4, player.h.HPRdivider).sub(player.h.HPRrank[2])

        player.h.HPRrankReq[3] = layers.h.hexReq(player.h.HPRrank[3], 216, 1.3, player.h.HPRdivider)
        player.h.HPRrankGain[3] = layers.h.hexGain(player.h.HPRrank[2], 216, 1.3, player.h.HPRdivider).sub(player.h.HPRrank[3])

        player.h.HPRrankReq[4] = layers.h.hexReq(player.h.HPRrank[4], 1296, 1.2, player.h.HPRdivider)
        player.h.HPRrankGain[4] = layers.h.hexGain(player.h.HPRrank[3], 1296, 1.2, player.h.HPRdivider).sub(player.h.HPRrank[4])

        player.h.HPRrankReq[5] = layers.h.hexReq(player.h.HPRrank[5], 7776, 1.1, player.h.HPRdivider)
        player.h.HPRrankGain[5] = layers.h.hexGain(player.h.HPRrank[4], 7776, 1.1, player.h.HPRdivider).sub(player.h.HPRrank[5])

        for (let i = 0; i < 6; i++) {
            if (player.h.HPRrankGain[i].lt(0)) player.h.HPRrankGain[i] = new Decimal(0)
        }

        if (hasMilestone("h", 103)) player.h.HPRrank[0] = player.h.HPRrank[0].add(player.h.HPRrankGain[0])

        player.h.HPRrankEffect[0][0] = player.h.HPRrank[0].pow(2.5).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[0][1] = player.h.HPRrank[0].pow(1.1).mul(0.5).mul(player.h.HRErefinementEffect[2][0]).add(1)

        player.h.HPRrankEffect[1][0] = player.h.HPRrank[1].pow(2.8).mul(2).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[1][1] = player.h.HPRrank[1].pow(1.2).mul(player.h.HRErefinementEffect[2][0]).add(1)

        player.h.HPRrankEffect[2][0] = player.h.HPRrank[2].pow(3.1).mul(4).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[2][1] = player.h.HPRrank[2].pow(1.4).mul(2).mul(player.h.HRErefinementEffect[2][0]).add(1)

        player.h.HPRrankEffect[3][0] = player.h.HPRrank[3].pow(3.4).mul(8).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[3][1] = player.h.HPRrank[3].pow(1.8).mul(4).mul(player.h.HRErefinementEffect[2][0]).add(1)

        player.h.HPRrankEffect[4][0] = player.h.HPRrank[4].pow(3.7).mul(16).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[4][1] = player.h.HPRrank[4].pow(2.2).mul(8).mul(player.h.HRErefinementEffect[2][0]).add(1)

        player.h.HPRrankEffect[5][0] = player.h.HPRrank[5].pow(4).mul(32).mul(player.h.HRErefinementEffect[2][0]).add(1)
        player.h.HPRrankEffect[5][1] = player.h.HPRrank[5].pow(2.6).mul(16).mul(player.h.HRErefinementEffect[2][0]).add(1)

        if (hasUpgrade("tad", 11)) {
            for (let i = 0; i < 6; i++) {
                player.h.HPRrankEffect[i][0] = player.h.HPRrankEffect[i][0].pow(1.1)
            }
        }

        // HEX OF REFINEMENT CALCULATIONS
        player.h.HRErefinementDiv = new Decimal(1)
        player.h.HRErefinementDiv = player.h.HRErefinementDiv.mul(player.rf.abilityEffects[7])
        player.h.HRErefinementDiv = player.h.HRErefinementDiv.mul(player.h.HBLboonEffects[3])
        player.h.HRErefinementDiv = player.h.HRErefinementDiv.mul(buyableEffect("ta", 47))
        if (hasUpgrade("h", 103)) player.h.HRErefinementDiv = player.h.HRErefinementDiv.mul(upgradeEffect("h", 103))
        player.h.HRErefinementReq = Decimal.pow(6, player.h.HRErefinement).mul(100000000).div(player.h.HRErefinementDiv)
        player.h.HRErefinementGain = player.h.hexPoint.add(1).div(100000000).mul(player.h.HRErefinementDiv).ln().div(new Decimal(6).ln()).add(1).sub(player.h.HRErefinement).floor()
        if (player.h.HRErefinementGain.lt(0)) player.h.HRErefinementGain = new Decimal(0)

        player.h.HRErefinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
        if (player.h.HRErefinement.gte(1)) player.h.HRErefinementEffect[0][0] = Decimal.pow(1.3, player.h.HRErefinement.pow(0.8)).mul(2)
        if (player.h.HRErefinement.gte(1)) player.h.HRErefinementEffect[0][1] = Decimal.pow(2, player.h.HRErefinement)

        if (player.h.HRErefinement.gte(3)) player.h.HRErefinementEffect[1][0] = Decimal.pow(1.15, player.h.HRErefinement.sub(2).pow(0.6))
        if (player.h.HRErefinement.gte(3)) player.h.HRErefinementEffect[1][1] = Decimal.pow(1.9, player.h.HRErefinement.sub(2))

        if (player.h.HRErefinement.gte(9)) player.h.HRErefinementEffect[2][0] = Decimal.pow(1.06, player.h.HRErefinement.sub(4).pow(0.6))
        if (player.h.HRErefinement.gte(9)) player.h.HRErefinementEffect[2][1] = Decimal.pow(1.8, player.h.HRErefinement.sub(4))

        if (player.h.HRErefinement.gte(24)) player.h.HRErefinementEffect[3][0] = Decimal.pow(1.5, player.h.HRErefinement.sub(23).pow(0.6))
        if (player.h.HRErefinement.gte(24)) player.h.HRErefinementEffect[3][1] = Decimal.pow(1.7, player.h.HRErefinement.sub(12))

        if (player.h.HRErefinement.gte(100)) player.h.HRErefinementEffect[4][1] = Decimal.pow(1.6, player.h.HRErefinement.sub(50))

        if (player.h.HRErefinement.gte(600)) player.h.HRErefinementEffect[5][1] = Decimal.pow(1.5, player.h.HRErefinement.sub(300))

        // HEX OF BLESSINGS CALCULATIONS
        player.h.HBLblessingsGain = new Decimal(0)
        if (player.h.HRErefinement.gte(18)) player.h.HBLblessingsGain = player.h.HRErefinement.sub(16).pow(1.6).div(3)
        player.h.HBLblessingsGain = player.h.HBLblessingsGain.mul(player.h.HBLboonEffects[4])
        
        player.h.HBLboonsGain = player.h.HBLblessings.pow(1.6).div(6)
        player.h.HBLboonsGain = player.h.HBLboonsGain.mul(player.h.HBLboonEffects[1])
        player.h.HBLboonsGain = player.h.HBLboonsGain.mul(player.h.HRErefinementEffect[3][0])
        player.h.HBLboonsGain = player.h.HBLboonsGain.mul(buyableEffect("h", 108))
        player.h.HBLboons = player.h.HBLboons.add(player.h.HBLboonsGain.mul(delta))

        player.h.HBLboonReq[0] = Decimal.pow(6, player.h.HBLboonLevels[0])
        player.h.HBLboonReq[1] = Decimal.pow(12, player.h.HBLboonLevels[1].add(1))
        player.h.HBLboonReq[2] = Decimal.pow(30, player.h.HBLboonLevels[2].add(1))
        player.h.HBLboonReq[3] = Decimal.pow(60, player.h.HBLboonLevels[3].add(2))
        player.h.HBLboonReq[4] = Decimal.pow(120, player.h.HBLboonLevels[4].add(2))
        player.h.HBLboonReq[5] = Decimal.pow(180, player.h.HBLboonLevels[5].add(2))

        for (let i = 0; i < 6; i++) {
            if (player.h.HBLboonXP[i].gte(player.h.HBLboonReq[i].mul(0.99))) {
                player.h.HBLboonXP[i] = new Decimal(0)
                player.h.HBLboonLevels[i] = player.h.HBLboonLevels[i].add(1)
            }
        }
        player.h.HBLboonEffects[0] = Decimal.pow(1.3, player.h.HBLboonLevels[0])
        player.h.HBLboonEffects[1] = Decimal.pow(1.6, player.h.HBLboonLevels[1])
        player.h.HBLboonEffects[2] = Decimal.pow(Decimal.mul(0.06, player.h.HBLboonEffects[5]).add(1), player.h.HBLboonLevels[2])
        player.h.HBLboonEffects[3] = Decimal.pow(2, player.h.HBLboonLevels[3])
        player.h.HBLboonEffects[4] = Decimal.pow(1.5, player.h.HBLboonLevels[4])
        player.h.HBLboonEffects[5] = Decimal.pow(2, player.h.HBLboonLevels[5])
        if (hasMilestone("h", 102)) {
            player.h.HBLboonEffects[0] = player.h.HBLboonEffects[0].mul(player.h.HBLboonXP[0].div(player.h.HBLboonReq[0]).mul(0.15).add(1))
            player.h.HBLboonEffects[1] = player.h.HBLboonEffects[1].mul(player.h.HBLboonXP[1].div(player.h.HBLboonReq[1]).mul(0.3).add(1))
            player.h.HBLboonEffects[2] = player.h.HBLboonEffects[2].mul(player.h.HBLboonXP[2].div(player.h.HBLboonReq[2]).mul(0.03).add(1))
            player.h.HBLboonEffects[3] = player.h.HBLboonEffects[3].mul(player.h.HBLboonXP[3].div(player.h.HBLboonReq[3]).mul(0.5).add(1))
            player.h.HBLboonEffects[4] = player.h.HBLboonEffects[4].mul(player.h.HBLboonXP[4].div(player.h.HBLboonReq[4]).mul(0.25).add(1))
            player.h.HBLboonEffects[5] = player.h.HBLboonEffects[5].mul(player.h.HBLboonXP[5].div(player.h.HBLboonReq[5]).mul(0.5).add(1))
        }

        // HEX OF CURSES CALCULATIONS
        player.h.HCUcursesGain = new Decimal(0)
        if (hasUpgrade("ta", 16)) player.h.HCUcursesGain = player.h.HBLblessings.add(1).log(6)
        player.h.HCUcursesGain = player.h.HCUcursesGain.mul(buyableEffect("h", 101))
        player.h.HCUcursesGain = player.h.HCUcursesGain.mul(buyableEffect("h", 103))
        player.h.HCUcursesGain = player.h.HCUcursesGain.mul(buyableEffect("h", 105))
        player.h.HCUcursesGain = player.h.HCUcursesGain.mul(buyableEffect("ta", 49))

        // CURSE EXPONENT
        player.h.HCUcursesGain = player.h.HCUcursesGain.pow(buyableEffect("h", 106))

        if (player.h.HCUcursesGain.gte(1e12)) player.h.HCUcursesGain = player.h.HCUcursesGain.div(1e12).pow(0.6).mul(1e12)
        player.h.HCUcurses = player.h.HCUcurses.add(player.h.HCUcursesGain.mul(delta))

        // JINX TOTAL
        player.h.HCUjinxTotal = getBuyableAmount("h", "101").add(getBuyableAmount("h", "102")).add(getBuyableAmount("h", "103")).add(getBuyableAmount("h", "104")).add(getBuyableAmount("h", "105")).add(getBuyableAmount("h", "106")).add(getBuyableAmount("h", "107")).add(getBuyableAmount("h", "108")).add(getBuyableAmount("h", "109"))

        // JINX ADD CAP
        player.h.HCUjinxAddCap = new Decimal(0)
        if (hasUpgrade("h", 101)) player.h.HCUjinxAddCap = player.h.HCUjinxAddCap.add(upgradeEffect("h", 101))
    },
    hexReq(value, base, scale, div = new Decimal(1), add = new Decimal(1)) {
        return value.add(add).pow(scale).mul(base).div(div).ceil()
    },
    hexGain(value, base, scale, div = new Decimal(1)) {
        return value.mul(div).div(base).pow(Decimal.div(1, scale)).floor()
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: "100px", minHeight: "50px" },
        },
        101: {
            title() { return "<h2>Reset hex points,<br>but gain α-Provenance.</h2><br><h3>Req: " + format(player.h.HPRrankReq[0]) + " Hex Points</h3>"},
            canClick() { return player.h.HPRrankGain[0].gt(0) && !hasMilestone("h", 103)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[0] = player.h.HPRrank[0].add(player.h.HPRrankGain[0])

                // RESET CODE
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                if (hasMilestone("h", 103)) look.cursor = "default !important"
                return look
            },
        },
        102: {
            title() { return "<h2>Reset prior provenances,<br>but gain β-Provenance.</h2><br><h3>Req: " + formatWhole(player.h.HPRrankReq[1]) + " α-Provenance</h3>"},
            canClick() { return player.h.HPRrankGain[1].gt(0)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[1] = player.h.HPRrank[1].add(player.h.HPRrankGain[1])

                // RESET CODE
                for (let i = 0; i < 1; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        103: {
            title() { return "<h2>Reset prior provenances,<br>but gain γ-Provenance.</h2><br><h3>Req: " + formatWhole(player.h.HPRrankReq[2]) + " β-Provenance</h3>"},
            canClick() { return player.h.HPRrankGain[2].gt(0)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[2] = player.h.HPRrank[2].add(player.h.HPRrankGain[2])

                // RESET CODE
                for (let i = 0; i < 2; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        104: {
            title() { return "<h2>Reset prior provenances,<br>but gain δ-Provenance.</h2><br><h3>Req: " + formatWhole(player.h.HPRrankReq[3]) + " γ-Provenance</h3>"},
            canClick() { return player.h.HPRrankGain[3].gt(0)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[3] = player.h.HPRrank[3].add(player.h.HPRrankGain[3])

                // RESET CODE
                for (let i = 0; i < 3; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        105: {
            title() { return "<h2>Reset prior provenances,<br>but gain ε-Provenance.</h2><br><h3>Req: " + formatWhole(player.h.HPRrankReq[4]) + " δ-Provenance</h3>"},
            canClick() { return player.h.HPRrankGain[4].gt(0)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[4] = player.h.HPRrank[4].add(player.h.HPRrankGain[4])

                // RESET CODE
                for (let i = 0; i < 4; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        106: {
            title() { return "<h2>Reset prior provenances,<br>but gain ζ-Provenance.</h2><br><h3>Req: " + formatWhole(player.h.HPRrankReq[5]) + " ε-Provenance</h3>"},
            canClick() { return player.h.HPRrankGain[5].gt(0)},
            unlocked: true,
            onClick() {
                player.h.HPRrank[5] = player.h.HPRrank[5].add(player.h.HPRrankGain[5])

                // RESET CODE
                for (let i = 0; i < 5; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                this.canClick() ? look.backgroundColor = "#0061ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        201: {
            title() { return "<h2>Refine, but reset hex points and provenance.</h2><br><h3>Req: " + format(player.h.HRErefinementReq) + " Hex Points</h3>"},
            canClick() { return player.h.HRErefinementGain.gte(1)},
            unlocked: true,
            onClick() {
                if (!hasMilestone("h", 101)) player.h.HRErefinement = player.h.HRErefinement.add(1)
                if (hasMilestone("h", 101)) player.h.HRErefinement = player.h.HRErefinement.add(player.h.HRErefinementGain)

                // RESET CODE
                for (let i = 0; i < 6; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: "2px solid white", borderRadius: "15px"}
                this.canClick() ? look.color = "white" : look.color = "black"
                this.canClick() ? look.backgroundColor = "#444444" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        301: {
            title: "<h2>Bless, but reset hex points, provenance, and refinement.</h2><br><h3>Req: 18 Refinements.</h3>",
            canClick() { return player.h.HRErefinement.gte(18)},
            unlocked: true,
            onClick() {
                player.h.HBLblessings = player.h.HBLblessings.add(player.h.HBLblessingsGain)

                // RESET CODE
                player.h.HRErefinement = new Decimal(0)
                player.h.HRErefinementGain = new Decimal(0)
                player.h.HRErefinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
                for (let i = 0; i < 6; i++) {
                    player.h.HPRrank[i] = new Decimal(0)
                    player.h.HPRrankGain[i] = new Decimal(0)
                    player.h.HPRrankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: "2px solid black", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#ffbf00" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        302: {
            title() { return "<h3>Hex Points <small>Lv." + formatWhole(player.h.HBLboonLevels[0]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[0]) + "/" + formatWhole(player.h.HBLboonReq[0]) + ")<br>x" + format(player.h.HBLboonEffects[0]) + " Hex Points<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked: true,
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[0].mul(0.05))) {
                    player.h.HBLboonXP[0] = player.h.HBLboonXP[0].add(player.h.HBLboonReq[0].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[0].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[0].div(player.h.HBLboonReq[0]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[0].div(player.h.HBLboonReq[0]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        303: {
            title() { return "<h3>Boons <small>Lv." + formatWhole(player.h.HBLboonLevels[1]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[1]) + "/" + formatWhole(player.h.HBLboonReq[1]) + ")<br>x" + format(player.h.HBLboonEffects[1]) + " Boons<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked: true,
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[1].mul(0.05))) {
                    player.h.HBLboonXP[1] = player.h.HBLboonXP[1].add(player.h.HBLboonReq[1].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[1].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[1].div(player.h.HBLboonReq[1]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[1].div(player.h.HBLboonReq[1]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        304: {
            title() { return "<h3>Infinity Points <small>Lv." + formatWhole(player.h.HBLboonLevels[2]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[2]) + "/" + formatWhole(player.h.HBLboonReq[2]) + ")<br>x" + format(player.h.HBLboonEffects[2]) + " Infinity Points<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked: true,
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[2].mul(0.05))) {
                    player.h.HBLboonXP[2] = player.h.HBLboonXP[2].add(player.h.HBLboonReq[2].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[2].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[2].div(player.h.HBLboonReq[2]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[2].div(player.h.HBLboonReq[2]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        305: {
            title() { return "<h3>Refiner Req <small>Lv." + formatWhole(player.h.HBLboonLevels[3]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[3]) + "/" + formatWhole(player.h.HBLboonReq[3]) + ")<br>/" + format(player.h.HBLboonEffects[3]) + " Refinement Req<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[3].mul(0.05))) {
                    player.h.HBLboonXP[3] = player.h.HBLboonXP[3].add(player.h.HBLboonReq[3].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[3].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[3].div(player.h.HBLboonReq[3]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[3].div(player.h.HBLboonReq[3]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        306: {
            title() { return "<h3>Blessings <small>Lv." + formatWhole(player.h.HBLboonLevels[4]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[4]) + "/" + formatWhole(player.h.HBLboonReq[4]) + ")<br>x" + format(player.h.HBLboonEffects[4]) + " Blessings<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[4].mul(0.05))) {
                    player.h.HBLboonXP[4] = player.h.HBLboonXP[4].add(player.h.HBLboonReq[4].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[4].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[4].div(player.h.HBLboonReq[4]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[4].div(player.h.HBLboonReq[4]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        307: {
            title() { return "<h3>IP Boon Booster <small>Lv." + formatWhole(player.h.HBLboonLevels[5]) + "</small></h3><br>(" + formatWhole(player.h.HBLboonXP[5]) + "/" + formatWhole(player.h.HBLboonReq[5]) + ")<br>x" + format(player.h.HBLboonEffects[5]) + " IP Boon Base<br><small>(Hold to deposit boons)</small></h3>" },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                if (player.h.HBLboons.gte(player.h.HBLboonReq[5].mul(0.05))) {
                    player.h.HBLboonXP[5] = player.h.HBLboonXP[5].add(player.h.HBLboonReq[5].mul(0.05))
                    player.h.HBLboons = player.h.HBLboons.sub(player.h.HBLboonReq[5].mul(0.05))
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.h.HBLboonXP[5].div(player.h.HBLboonReq[5]).mul(100).min(100))}%, #cc9800 ${format(player.h.HBLboonXP[5].div(player.h.HBLboonReq[5]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        401: {
            title: "<h3>Buy Max Jinxes</h3>",
            canClick() {
                let can = false
                for (let i = 101; i < 110; i++) {
                    if (tmp["h"].buyables[i].canBuy && tmp["h"].buyables[i].unlocked) can = true
                }
                return can
            },
            unlocked: true,
            onClick() {
                for (let i = 101; i < 110; i++) {
                    if (tmp["h"].buyables[i].canBuy && tmp["h"].buyables[i].unlocked) layers["h"].buyables[i].buy(true)
                }
            },
            style() {
                let look = {width: "200px", minHeight: "40px", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            }
        },
    },
    bars: {},
    upgrades: {
        101: {
            title: "Grace I",
            unlocked() { return true },
            description: "Increase jinx cap based on NIP.",
            cost: new Decimal(60),
            currencyLocation() { return player.h },
            currencyDisplayName: "Blessings",
            currencyInternalName: "HBLblessings",
            effect() {
                return player.ta.negativeInfinityPoints.add(1).log(6).pow(0.6).ceil()
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        102: {
            title: "Grace II",
            unlocked() { return true },
            description: "IP boosts hex point gain.",
            cost: new Decimal(180),
            currencyLocation() { return player.h },
            currencyDisplayName: "Blessings",
            currencyInternalName: "HBLblessings",
            effect() {
                return player.in.infinityPoints.add(1).log(6).pow(0.6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },
        103: {
            title: "Grace III",
            unlocked() { return true },
            description: "Infinities reduce refinement req.",
            cost: new Decimal(360),
            currencyLocation() { return player.h },
            currencyDisplayName: "Blessings",
            currencyInternalName: "HBLblessings",
            effect() {
                return player.in.infinities.add(1).log(3).pow(0.6).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        104: {
            title: "Grace IV",
            unlocked() { return false },
            description: "Alternative infinities boost curse gain.",
            cost: new Decimal(720),
            currencyLocation() { return player.h },
            currencyDisplayName: "Blessings",
            currencyInternalName: "HBLblessings",
            effect() {
                return player.tad.shatteredInfinities.mul(player.tad.disfiguredInfinities).mul(player.tad.corruptedInfinities).add(1).log(6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },
    },
    buyables: {
        101: {
            costBase() { return new Decimal(6).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap) },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(Decimal.add(2, buyableEffect("h", 102)), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(3e12)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Α-Jinx" },
            display() { return "Curses are multiplied by " + format(buyableEffect("h", 102).add(2)) },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)" },
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(3e12).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = this.cost(max)
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        102: {
            costBase() { return new Decimal(12).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(12) },
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap) },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.mul(0.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(8.04e17)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Β-Jinx" },
            display() { return "Increase Α-Jinx's effect by +0.1x" },
            total() { return "(Total: +" + format(tmp[this.layer].buyables[this.id].effect) + "x)" },
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(8.04e17).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        103: {
            costBase() { return new Decimal(1679616).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(36) },
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap) },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(player.h.HCUcurses.div(6).add(1).log(6).add(1).pow(0.3), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(3.81e29)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Γ-Jinx" },
            display() { return "Curses are multiplied by " + format(player.h.HCUcurses.div(6).add(1).log(6).add(1).pow(0.3)) + " (based on curses)" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(3.81e29).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        104: {
            costBase() { return new Decimal(1e8).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap).div(1.5).floor() },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(20)) cst = cst.pow(1.6).div(4.30e26)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Δ-Jinx" },
            display() { return "All jinxes are 2x cheaper" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(20)) Decimal.affordGeometricSeries(this.currency().mul(4.30e26).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        105: {
            costBase() { return new Decimal(1e12).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap).div(2).floor() },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(player.h.HCUjinxTotal.mul(0.01).add(1), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(15)) cst = cst.pow(1.6).div(1.08e32)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ε-Jinx" },
            display() { return "Curses are multiplied by " + format(player.h.HCUjinxTotal.mul(0.01).add(1)) + " (based on total jinxes)" },
            total() {return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(15)) Decimal.affordGeometricSeries(this.currency().mul(1.08e32).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        106: {
            costBase() { return new Decimal(1e18).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(1e6)},
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap).div(3).floor() },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.01, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(10)) cst = cst.pow(1.6).div(4.30e44)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ζ-Jinx" },
            display() { return "Curses are raised to the power of 1.01" },
            total() { return "(Total: ^" + format(tmp[this.layer].buyables[this.id].effect) + ")"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(10)) Decimal.affordGeometricSeries(this.currency().mul(4.30e44).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        107: {
            costBase() { return new Decimal(1e4).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(10)},
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap) },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(1.71e18)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Η-Jinx" },
            display() { return "Hex Points are multiplied by 1.1" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(1.71e18).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        108: {
            costBase() { return new Decimal(1e6).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(100)},
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap).div(1.5).floor() },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(20)) cst = cst.pow(1.6).div(2.70e25)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Θ-Jinx" },
            display() { return "Boons are multiplied by 1.1" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(2.70e25).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        109: {
            costBase() { return new Decimal(1e9).div(buyableEffect("h", 104)) },
            costGrowth() { return new Decimal(1000)},
            purchaseLimit() { return new Decimal(30).add(player.h.HCUjinxAddCap).div(2).floor() },
            currency() { return player.h.HCUcurses},
            pay(amt) { player.h.HCUcurses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(15)) cst = cst.pow(1.6).div(1.71e30)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ι-Jinx" },
            display() { return "Negative infinity points are multiplied by 1.2" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(15)) Decimal.affordGeometricSeries(this.currency().mul(1.71e30).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: '200px', height: '125px', fontSize: "12px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#77bf5f" : this.canBuy() ? look.backgroundColor = "#b2d8d8" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    milestones: {
        101: {
            requirementDescription: "<h3>18 Refinements",
            effectDescription: "Unlocks buy max refinements.",
            done() { return player.h.HRErefinement.gte(18)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        102: {
            requirementDescription: "<h3>24 Refinements",
            effectDescription: "Boon progress slightly boosts boon effect.",
            done() { return player.h.HRErefinement.gte(24)},
            unlocked() { return hasMilestone("h", 101) },
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        103: {
            requirementDescription: "<h3>30 Refinements",
            effectDescription: "Automate α-Provenance gain.",
            done() { return player.h.HRErefinement.gte(30)},
            unlocked() { return hasMilestone("h", 102) },
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        hexes: {
            "Provenance": {
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Hex of Provenance", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "50px", backgroundColor: "#001d4c", borderBottom: "2px solid white"}],
                        ["style-column", [
                            ["row", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[0]) + " α-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return player.h.HPRrank[0].lt(1200) ? "(+" + formatWhole(player.h.HPRrankGain[0]) + ")" : player.h.HPRrank[0].lt(6000000) ? "(+" + formatWhole(player.h.HPRrankGain[0]) + ") <small style='color:red'>[SOFTCAPPED]</small>" : "(+" + formatWhole(player.h.HPRrankGain[0]) + ") <small style='color:red'>[SOFTCAPPED<sup>2</sup>]</small>" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[0][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[0][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 101],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[1]) + " β-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "(+" + formatWhole(player.h.HPRrankGain[1]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[1][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[1][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 102],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[2]) + " γ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "(+" + formatWhole(player.h.HPRrankGain[2]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[2][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[2][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 103],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                            ]],
                            ["row", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[3]) + " δ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "(+" + formatWhole(player.h.HPRrankGain[3]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[3][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[3][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 104],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[4]) + " ε-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "(+" + formatWhole(player.h.HPRrankGain[4]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[4][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[4][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 105],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return formatWhole(player.h.HPRrank[5]) + " ζ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "(+" + formatWhole(player.h.HPRrankGain[5]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[5][0]) + " celestial points<br>x" + format(player.h.HPRrankEffect[5][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                                    ["clickable", 106],
                                ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                            ]],
                            ["row", [
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", "Total Celestial Point Multiplier", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "40px", borderRight: "2px solid white"}],
                                    ["style-row", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[0][0].mul(player.h.HPRrankEffect[1][0]).mul(player.h.HPRrankEffect[2][0]).mul(player.h.HPRrankEffect[3][0]).mul(player.h.HPRrankEffect[4][0]).mul(player.h.HPRrankEffect[5][0]))}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "183px", height: "40px"}],
                                ], {width: "385px", height: "40px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", "Total Hex Point Multiplier", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "40px", borderRight: "2px solid white"}],
                                    ["style-row", [
                                        ["raw-html", () => {return "x" + format(player.h.HPRrankEffect[0][1].mul(player.h.HPRrankEffect[1][1]).mul(player.h.HPRrankEffect[2][1]).mul(player.h.HPRrankEffect[3][1]).mul(player.h.HPRrankEffect[4][1]).mul(player.h.HPRrankEffect[5][1]))}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "178px", height: "40px"}],
                                ], {width: "380px", height: "40px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                            ]],
                        ], {height: "500px"}],
                    ], {width: "800px", height: "550px", backgroundColor: "#000919", border: "3px solid white", borderRadius: "0px 0px 20px 20px"}],
                ],
            },
            "Refinement": {
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Hex of Refinement", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "50px", backgroundColor: "#333", borderBottom: "2px solid white"}],
                        ["scroll-column", [
                            ["blank", "10px"],
                            ["row", [
                                ["raw-html", () => {return player.h.HRErefinement.neq(1) ? "You are at <h3>" + formatWhole(player.h.HRErefinement) + "</h3> refinements." : "You are at <h3>" + formatWhole(player.h.HRErefinement) + "</h3> refinement." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasMilestone("h", 101) ? "(+" + formatWhole(player.h.HRErefinementGain) + ")" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                            ]],
                            ["blank", "10px"],
                            ["clickable", 201],
                            ["blank", "5px"],
                            ["microtabs", "refine", {borderWidth: "0px"}],
                        ], {height: "500px"}],
                    ], {width: "800px", height: "550px", backgroundColor: "#111", border: "3px solid white", borderRadius: "0px 0px 20px 20px"}],
                ],
            },
            "Blessings": {
                unlocked() { return hasChallenge("ip", 13) },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Hex of Blessings", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "50px", backgroundColor: "#4c3900", borderBottom: "2px solid white"}],
                        ["scroll-column", [
                            ["blank", "10px"],
                            ["row", [
                                ["raw-html", () => {return "You have <h3>" + format(player.h.HBLblessings) + "</h3> blessings." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + format(player.h.HBLblessingsGain) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                            ]],
                            ["blank", "10px"],
                            ["clickable", 301],
                            ["blank", "5px"],
                            ["microtabs", "blessing", {borderWidth: "0px"}],
                        ], {height: "500px"}],
                    ], {width: "800px", height: "550px", backgroundColor: "#191300", border: "3px solid white", borderRadius: "0px 0px 20px 20px"}],
                ],
            },
            "Curses": {
                unlocked() { return hasUpgrade("ta", 16) },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Hex of Curses", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "50px", backgroundColor: "#354040", borderBottom: "2px solid white"}],
                        ["scroll-column", [
                            ["blank", "10px"],
                            ["row", [
                                ["raw-html", () => {return "You have <h3>" + format(player.h.HCUcurses) + "</h3> Curses." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + format(player.h.HCUcursesGain) + "/s)" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                                ["raw-html", () => {return player.h.HCUcursesGain.gte(1e12) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                            ]],
                            ["blank", "10px"],
                            ["clickable", 401],
                            ["blank", "10px"],
                            ["row", [["jinx-buyable", 101], ["jinx-buyable", 102], ["jinx-buyable", 103]]],
                            ["row", [["jinx-buyable", 104], ["jinx-buyable", 105], ["jinx-buyable", 106]]],
                            ["blank", "10px"],
                            ["row", [["jinx-buyable", 107], ["jinx-buyable", 108], ["jinx-buyable", 109]]],
                            ["blank", "10px"],
                        ], {height: "500px"}],
                    ], {width: "800px", height: "550px", backgroundColor: "#111515", border: "3px solid white", borderRadius: "0px 0px 20px 20px"}],
                ],
            },
            "Power": {
                unlocked() { return hasUpgrade("ta", 16) },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Hex of Power", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "50px", backgroundColor: "#4c1919", borderBottom: "2px solid white"}],
                        ["scroll-column", [
                            ["blank", "10px"],
                            ["row", [
                                ["raw-html", () => {return "You have <h3>" + formatWhole(player.h.HPWpower) + "</h3> Power." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + formatWhole(player.h.HPWpowerGain) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                            ]],
                            ["blank", "25px"],
                        ], {height: "500px"}],
                    ], {width: "800px", height: "550px", backgroundColor: "#190808", border: "3px solid white", borderRadius: "0px 0px 20px 20px"}],
                ],
            },
            "RAGE POWER": {
                buttonStyle() { return { borderColor: "#5e0000", backgroundColor: "#ff5555", color: "red", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("i", 29) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.h.ragePower) + "</h3> rage power, which boost antimatter dimensions by x" + format(player.h.ragePowerEffect) + "."}, { "color": "#ff5555", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.h.ragePowerToGet) + "</h3> rage power on reset." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Based on hex 1 points)" }, { "color": "#ff5555", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 16]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Rage power also boosts hex " + formatWhole(player.h.currentRagePowerEffect.add(1)) + " points by x" + format(player.h.ragePowerCycleEffect) + "." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Time to increase hex layer: " + formatTime(player.h.ragePowerCycleTimer) + "/" + formatTime(player.h.ragePowerCycleTimerReq) + "." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["text-input", "ragePowerCycleTimerReqInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                ],
            },
        },
        refine: {
            "Refiners": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["row", [
                        ["raw-html", () => {return player.h.HRErefinement.lt(3) ? "Next refiner at 3 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.h.HRErefinement.gte(3) && player.h.HRErefinement.lt(9) ? "Next refiner at 9 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.h.HRErefinement.gte(10) && player.h.HRErefinement.lt(24) ? "Next refiner at 24 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.h.HRErefinement.gte(24) && player.h.HRErefinement.lt(100) ? "Next refiner at 100 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.h.HRErefinement.gte(100) && player.h.HRErefinement.lt(600) ? "Next refiner at 600 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ]],
                    ["blank", "5px"],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 1", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[0][0]) + "<br>Hex Points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[0][1]) + "<br>Factor Power"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 2", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "/" + format(player.h.HRErefinementEffect[1][0]) + "<br>Provenance Req's"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[1][1]) + "<br>Prestige Points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.h.HRErefinement.gte(3) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 3", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[2][0]) + "<br>Provenance Effects"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[2][1]) + "<br>Trees"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.h.HRErefinement.gte(9) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 4", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[3][0]) + "<br>Boons"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[3][1]) + "<br>Grass"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.h.HRErefinement.gte(24) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                    ]],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 5", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [

                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[4][1]) + "<br>Grasshoppers"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.h.HRErefinement.gte(100) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 6", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [

                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.h.HRErefinementEffect[5][1]) + "<br>Mods"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.h.HRErefinement.gte(600) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Milestones": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["raw-html", "Milestones kept on later resets.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["milestone", 101],
                    ["milestone", 102],
                    ["milestone", 103],
                ]
            },
        },
        blessing: {
            "Boons": {
                buttonStyle() { return {borderColor: "#ffbf00", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.h.HBLboons) + "</h3> boons." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.h.HBLboonsGain) + "/s)" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "10px"],
                    ["row", [["clickable", 302], ["clickable", 303], ["clickable", 304]]],
                    ["row", [["clickable", 305], ["clickable", 306], ["clickable", 307]]],
                ]
            },
            "Graces": {
                buttonStyle() { return {borderColor: "#ffbf00", borderRadius: "5px"}},
                unlocked() { return hasUpgrade("ta", 18)},
                content: [
                    ["blank", "10px"],
                    ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points. (+" + format(player.h.hexPointGain) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "10px"],
        ["row", [["clickable", 1]]],
        ["blank", "10px"],
        ["left-row", [
            ["row-tree", tree],
        ], {background: "repeating-conic-gradient(from 45deg, rgba(60, 60, 60, 0.4) 0% 25%, rgba(40, 40, 40, 0.4) 0% 50%)", backgroundSize: "60px 60px", backgroundColor: "rgba(40, 40, 40, 0.4)",
            paddingLeft: "20px", width: "780px", height: "250px", borderTop: "3px solid white", borderLeft: "3px solid white", borderRight: "3px solid white", borderRadius: "20px 20px 0px 0px"}],
        ["buttonless-microtabs", "hexes", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && inChallenge("ip", 13) || player.po.hex}
})