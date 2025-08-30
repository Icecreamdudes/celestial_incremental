var treeh = [["hpr", "hsa"], ["hre", "hpu"], ["hbl", "hcu", "hve"], ["hpw", "hrm"]]
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

        // Pre-Power Resources
        prePowerMult: new Decimal(1),

        ragePower: new Decimal(1),
    }},
    nodeStyle() { return {color: "white", backgroundColor: "black", borderColor: "#0061ff"}},
    glowColor: "rgba(0, 0, 0, 0)",
    tooltip: "Hex",
    color: "#d4d4d4",
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF HEX POINT GAIN
        player.h.hexPointGain = new Decimal(0)
        if (!hasChallenge("ip", 13) && layerShown("h")) player.h.hexPointGain = new Decimal(12)
        if (hasChallenge("ip", 13)) player.h.hexPointGain = player.points.add(1).log(60).pow(0.6)
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[0][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[1][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[2][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[3][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[4][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hpr.rankEffect[5][1])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hre.refinementEffect[0][0])
        player.h.hexPointGain = player.h.hexPointGain.mul(player.d.diceEffects[14])
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("cb", 11))
        player.h.hexPointGain = player.h.hexPointGain.mul(player.hbl.boosterEffects[0])
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("hcu", 107))
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("ta", 48))
        if (player.pol.pollinatorEffects.ant.enabled) player.h.hexPointGain = player.h.hexPointGain.mul(player.pol.pollinatorEffects.ant.effects[2])
        if (hasUpgrade("hbl", 2)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hbl", 2))
        if (hasUpgrade("hbl", 5)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hbl", 5))
        if (hasUpgrade("hpw", 2)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hpw", 2))
        if (hasUpgrade("hve", 11)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hve", 11))
        if (hasUpgrade("hve", 12)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hve", 12))
        if (hasUpgrade("hve", 13)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hve", 13))
        player.h.hexPointGain = player.h.hexPointGain.mul(player.h.prePowerMult)

        // POWER
        if (hasUpgrade("hve", 61)) player.h.hexPointGain = player.h.hexPointGain.pow(1.03)

        // SOFTCAPS
        if (inChallenge("hrm", 14)) player.h.hexPointGain = player.h.hexPointGain.pow(Decimal.add(0.1, player.hsa.sacredEffect))
        if (player.h.hexPointGain.gte(1e308)) player.h.hexPointGain = player.h.hexPointGain.div(1e308).pow(Decimal.add(0.1, player.hsa.sacredEffect)).mul(1e308)

        // POST-SOFTCAP MULTIPLIERS
        if (hasUpgrade("hsa", 11)) player.h.hexPointGain = player.h.hexPointGain.mul(2)
        if (hasUpgrade("hsa", 13)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hsa", 13))
        if (hasUpgrade("hsa", 21)) player.h.hexPointGain = player.h.hexPointGain.mul(upgradeEffect("hsa", 21))
        player.h.hexPointGain = player.h.hexPointGain.mul(buyableEffect("hsa", 2))

        // PER SECOND CALCULATIONS
        if (inChallenge("hrm", 13)) player.h.hexPointGain = player.h.hexPointGain.sub(player.h.hexPoint.mul(0.06))
        if (player.h.hexPoint.add(player.h.hexPointGain.mul(delta)).gt(0)) player.h.hexPoint = player.h.hexPoint.add(player.h.hexPointGain.mul(delta))

        // PRE-POWER MULTIPLIER
        player.h.prePowerMult = new Decimal(1)
        player.h.prePowerMult = player.h.prePowerMult.mul(player.hrm.realmEssenceEffects[0])
        if (hasUpgrade("hpw", 121)) player.h.prePowerMult = player.h.prePowerMult.mul(3)
        if (hasUpgrade("hpw", 141)) player.h.prePowerMult = player.h.prePowerMult.mul(upgradeEffect("hpw", 141))
        player.h.prePowerMult = player.h.prePowerMult.mul(player.le.punchcardsLevels[8])
    },
    hexReq(value, base, scale, div = new Decimal(1), add = new Decimal(1)) {
        return value.add(add).pow(scale).mul(base).div(div).ceil()
    },
    hexGain(value, base, scale, div = new Decimal(1)) {
        return value.mul(div).div(base).pow(Decimal.div(1, scale)).floor()
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return (inChallenge("hrm", 14) || player.h.hexPointGain.gte(1e308)) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 15) ? "Time Remaining: " + formatTime(player.hrm.dreamTimer) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge}
})