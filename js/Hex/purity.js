addLayer("hpu", {
    name: "Hex of Purity",
    symbol: "Pu", // Decides what text appears on the node.
    tooltip: "Purity", // Decides the nodes tooltip
    color: "#e0d4ad", // Decides the nodes color.
    branches: ["hre"], // Decides the nodes branches.
    startData() { return {
        purity: new Decimal(0),
        totalPurity: new Decimal(0),
        purityReq: new Decimal(42),
        purityGain: new Decimal(0),
        purifier: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        purifierEffects: [new Decimal(1), new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(0)],
        keptPurity: new Decimal(0),
        purifierAssign: 1,
    }},
    update(delta) {
        player.hpu.purityReq = player.hpu.totalPurity.mul(6).add(42).sub(player.hpu.keptPurity.mul(6)).ceil()
        player.hpu.purityGain = player.hre.refinement.add(player.hpu.keptPurity.mul(6)).sub(42).div(6).add(1).sub(player.hpu.totalPurity).floor()

        if (inChallenge("hrm", 12)) {
            player.hpu.purityReq = player.hpu.totalPurity.mul(4).add(28).sub(player.hpu.keptPurity.mul(4)).ceil()
            player.hpu.purityGain = player.hre.refinement.add(player.hpu.keptPurity.mul(4)).sub(28).div(4).add(1).sub(player.hpu.totalPurity).floor()
        }

        if (player.hpu.purityGain.lt(1)) player.hpu.purityGain = new Decimal(0)

        if (hasMilestone("hre", 15) && !inChallenge("hrm", 15)) {
            player.hpu.purity = player.hpu.purity.add(player.hpu.purityGain)
            player.hpu.totalPurity = player.hpu.totalPurity.add(player.hpu.purityGain)
        }

        if (hasUpgrade("hpw", 101)) player.hpu.purifier[2] = player.hpu.totalPurity

        player.hpu.purifierEffects[0] = player.hpu.purifier[0].mul(0.1).add(1)
        if (player.hpu.purifierEffects[0].gt(1.5)) player.hpu.purifierEffects[0] = player.hpu.purifierEffects[0].div(1.5).pow(0.6).mul(1.5)
        if (inChallenge("hrm", 16) && player.hpu.purifierEffects[0].gt(3)) player.hpu.purifierEffects[0] = new Decimal(3)

        player.hpu.purifierEffects[1] = Decimal.pow(1.5, player.hpu.purifier[1])
        if (player.hpu.purifierEffects[1].gt(8)) player.hpu.purifierEffects[1] = player.hpu.purifierEffects[1].div(8).pow(0.6).mul(8)

        player.hpu.purifierEffects[2] = player.hpu.purifier[2].mul(0.1).add(1)
        if (player.hpu.purifierEffects[2].gt(1.5)) player.hpu.purifierEffects[2] = player.hpu.purifierEffects[2].div(1.5).pow(0.6).mul(1.5)

        player.hpu.purifierEffects[3] = player.hpu.purifier[3].mul(0.1).add(1)
        if (player.hpu.purifierEffects[3].gt(1.5)) player.hpu.purifierEffects[3] = player.hpu.purifierEffects[3].div(1.5).pow(0.6).mul(1.5)

        player.hpu.purifierEffects[4] = new Decimal(0)
        if (player.hpu.purifier[4].gt(0) && !inChallenge("hrm", 11)) player.hpu.purifierEffects[4] = Decimal.pow(2, player.hpu.purifier[4].sub(1)).mul(0.2)
        if (player.hpu.purifierEffects[4].gt(3.2) && !hasUpgrade("hpw", 61)) player.hpu.purifierEffects[4] = player.hpu.purifierEffects[4].div(3.2).pow(0.6).mul(3.2)
        if (player.hpu.purifierEffects[4].gt(3.2) && hasUpgrade("hpw", 61)) player.hpu.purifierEffects[4] = player.hpu.purifierEffects[4].div(3.2).pow(0.7).mul(3.2)

        if (!inChallenge("hrm", 12)) {
            player.hpu.purifierEffects[5] = player.hpu.purifier[5].mul(0.15).add(1)
            if (player.hpu.purifierEffects[5].gt(1.75)) player.hpu.purifierEffects[5] = player.hpu.purifierEffects[5].div(1.75).pow(0.6).mul(1.75)
        }
        if (inChallenge("hrm", 12)) {
            player.hpu.purifierEffects[5] = player.hpu.purifier[5].mul(0.1).add(1)
            if (player.hpu.purifierEffects[5].gt(1.5)) player.hpu.purifierEffects[5] = player.hpu.purifierEffects[5].div(1.5).pow(0.6).mul(1.5)
        }

        player.hpu.keptPurity = new Decimal(0)
        if (hasUpgrade("hpw", 21)) player.hpu.keptPurity = player.hpu.keptPurity.add(1)
        if (hasUpgrade("hve", 52)) player.hpu.keptPurity = player.hpu.keptPurity.add(2)
        if (hasUpgrade("hpw", 111)) player.hpu.keptPurity = player.hpu.keptPurity.add(3)
    },
    clickables: {
        1: {
            title() {
                if (inChallenge("hrm", 16)) return "<h2>Purify, but reset hex points and refinement.</h2><br><h3>Req: " + formatWhole(player.hpu.purityReq) + " Refinements</h3>"
                return "<h2>Purify, but reset hex points, provenance, and refinement.</h2><br><h3>Req: " + formatWhole(player.hpu.purityReq) + " Refinements</h3>"
            },
            canClick() { return player.hpu.purityGain.gte(1) && (!hasMilestone("hre", 15) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                let amt = new Decimal(1)
                if (hasMilestone("hre", 13)) amt = player.hpu.purityGain
                player.hpu.purity = player.hpu.purity.add(amt)
                player.hpu.totalPurity = player.hpu.totalPurity.add(amt)

                // RESET CODE
                player.hre.refinement = new Decimal(0)
                player.hre.refinementGain = new Decimal(0)
                player.hre.refinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
                for (let i = 0; i < 6; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: "2px solid black", borderRadius: "15px"}
                if (hasMilestone("hre", 15) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        2: {
            title() { return "Respec your purifiers"},
            canClick() { return player.hpu.totalPurity.gt(player.hpu.purity)},
            unlocked: true,
            onClick() {
                player.hpu.purity = player.hpu.totalPurity
                player.hpu.purifier = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]

                let extra = new Decimal(0)
                if (hasUpgrade("hpw", 41)) extra = extra.add(1)
                if (hasUpgrade("hve", 33)) extra = extra.add(1)
                player.hpu.purifier[1] = extra
                player.hpu.purifier[4] = extra
            },
            style: {width: "250px", minHeight: "40px", border: "2px solid black", borderRadius: "15px"},
        },
        3: {
            title() {
                let str = "<h3>Purified Provenances</h3><br>Lv." + formatWhole(player.hpu.purifier[0]) + "<br>^" + format(player.hpu.purifierEffects[0]) + " Refiner 2's Effects"
                if (player.hpu.purifierEffects[0].gt(1.5)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1)},
            unlocked: true,
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[0] = player.hpu.purifier[0].add(amt)
            },
            style: {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"},
        },
        4: {
            title() {
                let str = "<h3>Multiplied Miracles</h3><br>Lv." + formatWhole(player.hpu.purifier[1]) + "<br>x" + format(player.hpu.purifierEffects[1]) + " 1st & 4th Miracles"
                if (inChallenge("hrm", 12)) str = "<h3>Multiplied Miracles</h3><br>Lv." + formatWhole(player.hpu.purifier[1]) + "<br>x" + format(player.hpu.purifierEffects[1]) + " Blessings and Boons"
                if (player.hpu.purifierEffects[1].gt(8)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1)},
            unlocked: true,
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[1] = player.hpu.purifier[1].add(amt)
            },
            style: {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"},
        },
        5: {
            title() {
                let str = "<h3>Elevated Exponent</h3><br>Lv." + formatWhole(player.hpu.purifier[2]) + "<br>^" + format(player.hpu.purifierEffects[2]) + " Non-Hex Refiner Effects"
                if (player.hpu.purifierEffects[2].gt(1.5)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1) && !hasUpgrade("hpw", 101)},
            unlocked: true,
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[2] = player.hpu.purifier[2].add(amt)
            },
            style() {
                let look = {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"}
                if (hasUpgrade("hpw", 101)) {
                    look.backgroundColor = "#77bf5f"
                    look.cursor = "default !important"
                }
                return look
            },
        },
        6: {
            title() {
                let str = "<h3>Healed Hexes</h3><br>Lv." + formatWhole(player.hpu.purifier[3]) + "<br>^" + format(player.hpu.purifierEffects[3]) + " Hex Point Booster"
                if (inChallenge("hrm", 12)) str = "<h3>Healed Hexes</h3><br>Lv." + formatWhole(player.hpu.purifier[3]) + "<br>^" + format(player.hpu.purifierEffects[3]) + " 1st Refiners Effects"
                if (player.hpu.purifierEffects[3].gt(1.5)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1)},
            unlocked() { return hasUpgrade("hpw", 31) },
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[3] = player.hpu.purifier[3].add(amt)
            },
            style: {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"},
        },
        7: {
            title() {
                let str = "<h3>Amended Automation</h3><br>Lv." + formatWhole(player.hpu.purifier[4]) + "<br>+" + formatWhole(player.hpu.purifierEffects[4].mul(100)) + "% blessings/s"
                str = str.concat("<br><small>(" + format(player.hbl.blessingsGain.mul(player.hpu.purifierEffects[4])) + "/s)</small>")
                if (player.hpu.purifierEffects[4].gt(3.2)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                if (inChallenge("hrm", 11)) str = str.concat("<br><small style='color:red'>[DISABLED BY CREATOR REALM]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1) && !inChallenge("hrm", 11)},
            unlocked() { return hasUpgrade("hpw", 31) },
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[4] = player.hpu.purifier[4].add(amt)
            },
            style() {
                let look = {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"}
                if (inChallenge("hrm", 11)) look.opacity = "0.5"
                return look
            },
        },
        8: {
            title() {
                let str = "<h3>Cleansed Curses</h3><br>Lv." + formatWhole(player.hpu.purifier[5]) + "<br>^" + format(player.hpu.purifierEffects[5]) + " 4th Grace Effect"
                if (inChallenge("hrm", 12)) str = "<h3>Cleansed Curses</h3><br>Lv." + formatWhole(player.hpu.purifier[5]) + "<br>^" + format(player.hpu.purifierEffects[5]) + " Base Α-Jinx Effect"
                if (player.hpu.purifierEffects[5].gt(1.75) || (inChallenge("hrm", 12) && player.hpu.purifierEffects[5].gt(1.5))) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick() {return player.hpu.purity.gte(1)},
            unlocked() { return hasUpgrade("hpw", 31) },
            onClick() {
                let amt = player.hpu.purity.min(player.hpu.purifierAssign)
                player.hpu.purity = player.hpu.purity.sub(amt)
                player.hpu.purifier[5] = player.hpu.purifier[5].add(amt)
            },
            style: {width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "15px", margin: "3px"},
        },
        101: {
            title: "1",
            canClick() { return player.hpu.purifierAssign != 1},
            unlocked() { return hasMilestone("hre", 10)},
            onClick() {
                player.hpu.purifierAssign = 1
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0px"},
        },
        102: {
            title: "5",
            canClick() { return player.hpu.purifierAssign != 5},
            unlocked() { return hasMilestone("hre", 10)},
            onClick() {
                player.hpu.purifierAssign = 5
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0px"},
        },
        103: {
            title: "25",
            canClick() { return player.hpu.purifierAssign != 25},
            unlocked() { return hasMilestone("hre", 10)},
            onClick() {
                player.hpu.purifierAssign = 25
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0 13px 13px 0"},
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return (inChallenge("hrm", 14) || player.h.hexPointGain.gte(1e308)) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 15) ? "Time Remaining: " + formatTime(player.hrm.dreamTimer) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Purity", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#433f33", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.hpu.purity) + "</h3> purity." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return hasMilestone("hre", 13) ? "(+" + formatWhole(player.hpu.purityGain) + ")" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return "(You have <h3>" + formatWhole(player.hpu.totalPurity) + "</h3> total purity)" }, {color: "#ddd", fontSize: "16px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "10px"],
        ["clickable", 2],
        ["blank", "10px"],
        ["row", [["clickable", 3], ["clickable", 4], ["clickable", 5]]],
        ["row", [["clickable", 6], ["clickable", 7], ["clickable", 8]]],
        ["blank", "10px"],
        ["style-row", [
            ["style-row", [
                ["raw-html", "Level Amount", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ], {width: "98px", height: "40px", borderRight: "2px solid black"}],
            ["clickable", 101], ["clickable", 102], ["clickable", 103]
        ], () => {
            if (hasMilestone("hre", 10)) return {width: "250px", height: "40px", backgroundColor: "#2c2a22", border: "2px solid black", borderRadius: "15px"}
            return {display: "none !important"}
        }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("i", 29) }, // Decides if this node is shown or not.
});