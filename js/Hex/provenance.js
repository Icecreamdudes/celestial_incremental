addLayer("hpr", {
    name: "Hex of Provenance",
    symbol: "Pr", // Decides what text appears on the node.
    tooltip: "Provenance", // Decides the nodes tooltip
    color: "#0061ff", // Decides the nodes color.
    startData() { return {
        rank: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        rankReq: [new Decimal(60), new Decimal(6), new Decimal(36), new Decimal(216), new Decimal(1296), new Decimal(7776)],
        rankGain: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        rankEffect: [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]],
        divider: new Decimal(1),
        effectMult: new Decimal(1),
    }},
    update(delta) {
        player.hpr.divider = player.hre.refinementEffect[1][0]
        if (hasUpgrade("hsa", 15)) player.hpr.divider = player.hpr.divider.mul(1.3)
        if (hasUpgrade("hpw", 132)) player.hpr.divider = player.hpr.divider.mul(1.5)

        if (player.hpr.rank[0].lt(1200)) player.hpr.rankReq[0] = layers.h.hexReq(player.hpr.rank[0], 60, 1.6, player.hpr.divider)
        if (player.hpr.rank[0].gte(1200) && player.hpr.rank[0].lt(6000000)) player.hpr.rankReq[0] = layers.h.hexReq(player.hpr.rank[0], 60, 2.4, player.hpr.divider, -1087)
        if (player.hpr.rank[0].gte(6000000) && player.hpr.rank[0].lt(2.4e8)) player.hpr.rankReq[0] = layers.h.hexReq(player.hpr.rank[0], 60, 6, player.hpr.divider, new Decimal(-5999485))
        if (player.hpr.rank[0].gte(2.4e8)) player.hpr.rankReq[0] = layers.h.hexReq(player.hpr.rank[0], 60, 30, player.hpr.divider, new Decimal(-239999952))
        if (player.h.hexPoint.lt(Decimal.div(5074814, player.hpr.divider))) player.hpr.rankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 1.6, player.hpr.divider).sub(player.hpr.rank[0])
        if (player.h.hexPoint.gte(Decimal.div(5074814, player.hpr.divider)) && player.h.hexPoint.lt(Decimal.div(1.11e18, player.hpr.divider))) player.hpr.rankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 2.4, player.hpr.divider).sub(player.hpr.rank[0]).add(1088)
        if (player.h.hexPoint.gte(Decimal.div(1.11e18, player.hpr.divider)) && player.h.hexPoint.lt(Decimal.div(9.85e51, player.hpr.divider))) player.hpr.rankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 6, player.hpr.divider).sub(player.hpr.rank[0]).add(5999486)
        if (player.h.hexPoint.gte(Decimal.div(9.85e51, player.hpr.divider))) player.hpr.rankGain[0] = layers.h.hexGain(player.h.hexPoint, 60, 30, player.hpr.divider).sub(player.hpr.rank[0]).add(239999953)

        player.hpr.rankReq[1] = layers.h.hexReq(player.hpr.rank[1], 6, 1.5, player.hpr.divider)
        player.hpr.rankGain[1] = layers.h.hexGain(player.hpr.rank[0], 6, 1.5, player.hpr.divider).sub(player.hpr.rank[1])

        player.hpr.rankReq[2] = layers.h.hexReq(player.hpr.rank[2], 36, 1.4, player.hpr.divider)
        player.hpr.rankGain[2] = layers.h.hexGain(player.hpr.rank[1], 36, 1.4, player.hpr.divider).sub(player.hpr.rank[2])

        player.hpr.rankReq[3] = layers.h.hexReq(player.hpr.rank[3], 216, 1.3, player.hpr.divider)
        player.hpr.rankGain[3] = layers.h.hexGain(player.hpr.rank[2], 216, 1.3, player.hpr.divider).sub(player.hpr.rank[3])

        player.hpr.rankReq[4] = layers.h.hexReq(player.hpr.rank[4], 1296, 1.2, player.hpr.divider)
        player.hpr.rankGain[4] = layers.h.hexGain(player.hpr.rank[3], 1296, 1.2, player.hpr.divider).sub(player.hpr.rank[4])

        player.hpr.rankReq[5] = layers.h.hexReq(player.hpr.rank[5], 7776, 1.1, player.hpr.divider)
        player.hpr.rankGain[5] = layers.h.hexGain(player.hpr.rank[4], 7776, 1.1, player.hpr.divider).sub(player.hpr.rank[5])

        for (let i = 0; i < 6; i++) {
            if (player.hpr.rankGain[i].lt(0)) player.hpr.rankGain[i] = new Decimal(0)
        }

        if (!inChallenge("hrm", 15) && !inChallenge("hrm", 16)) {
            if (hasMilestone("hre", 3)) player.hpr.rank[0] = player.hpr.rank[0].add(player.hpr.rankGain[0])
            if (hasMilestone("hre", 6)) player.hpr.rank[1] = player.hpr.rank[1].add(player.hpr.rankGain[1])
            if (hasMilestone("hre", 8)) player.hpr.rank[2] = player.hpr.rank[2].add(player.hpr.rankGain[2])
            if (hasMilestone("hre", 11)) player.hpr.rank[3] = player.hpr.rank[3].add(player.hpr.rankGain[3])
            if (hasMilestone("hre", 14)) player.hpr.rank[4] = player.hpr.rank[4].add(player.hpr.rankGain[4])
            if (hasMilestone("hre", 18)) player.hpr.rank[5] = player.hpr.rank[5].add(player.hpr.rankGain[5])
        }

        player.hpr.effectMult = player.hre.refinementEffect[2][0]
        if (hasUpgrade("hbl", 6)) player.hpr.effectMult = player.hpr.effectMult.mul(upgradeEffect("hbl", 6))
        if (hasMilestone("hbl", 5)) player.hpr.effectMult = player.hpr.effectMult.mul(1.3)
        if (hasUpgrade("hpw", 102)) player.hpr.effectMult = player.hpr.effectMult.mul(upgradeEffect("hpw", 102))

        // Disable effects
        if (inChallenge("hrm", 16)) player.hpr.effectMult = new Decimal(0)

        player.hpr.rankEffect[0][0] = player.hpr.rank[0].pow(2.5).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[0][1] = player.hpr.rank[0].pow(1.1).mul(0.5).mul(player.hpr.effectMult).add(1)

        player.hpr.rankEffect[1][0] = player.hpr.rank[1].pow(2.8).mul(2).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[1][1] = player.hpr.rank[1].pow(1.2).mul(player.hpr.effectMult).add(1)

        player.hpr.rankEffect[2][0] = player.hpr.rank[2].pow(3.1).mul(4).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[2][1] = player.hpr.rank[2].pow(1.4).mul(2).mul(player.hpr.effectMult).add(1)

        player.hpr.rankEffect[3][0] = player.hpr.rank[3].pow(3.4).mul(8).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[3][1] = player.hpr.rank[3].pow(1.8).mul(4).mul(player.hpr.effectMult).add(1)

        player.hpr.rankEffect[4][0] = player.hpr.rank[4].pow(3.7).mul(16).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[4][1] = player.hpr.rank[4].pow(2.2).mul(8).mul(player.hpr.effectMult).add(1)

        player.hpr.rankEffect[5][0] = player.hpr.rank[5].pow(4).mul(32).mul(player.hpr.effectMult).add(1)
        player.hpr.rankEffect[5][1] = player.hpr.rank[5].pow(2.6).mul(16).mul(player.hpr.effectMult).add(1)

        if (hasUpgrade("tad", 11)) {
            for (let i = 0; i < 6; i++) {
                player.hpr.rankEffect[i][0] = player.hpr.rankEffect[i][0].pow(1.1)
            }
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Reset hex points,<br>but gain α-Provenance.</h2><br><h3>Req: " + format(player.hpr.rankReq[0]) + " Hex Points</h3>"},
            canClick() { return player.hpr.rankGain[0].gt(0) && (!hasMilestone("hre", 3) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[0] = player.hpr.rank[0].add(player.hpr.rankGain[0])

                // RESET CODE
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 3) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        2: {
            title() { return "<h2>Reset prior provenances,<br>but gain β-Provenance.</h2><br><h3>Req: " + formatWhole(player.hpr.rankReq[1]) + " α-Provenance</h3>"},
            canClick() { return player.hpr.rankGain[1].gt(0) && (!hasMilestone("hre", 6) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[1] = player.hpr.rank[1].add(player.hpr.rankGain[1])

                // RESET CODE
                for (let i = 0; i < 1; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 6) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        3: {
            title() { return "<h2>Reset prior provenances,<br>but gain γ-Provenance.</h2><br><h3>Req: " + formatWhole(player.hpr.rankReq[2]) + " β-Provenance</h3>"},
            canClick() { return player.hpr.rankGain[2].gt(0) && (!hasMilestone("hre", 8) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[2] = player.hpr.rank[2].add(player.hpr.rankGain[2])

                // RESET CODE
                for (let i = 0; i < 2; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 8) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        4: {
            title() { return "<h2>Reset prior provenances,<br>but gain δ-Provenance.</h2><br><h3>Req: " + formatWhole(player.hpr.rankReq[3]) + " γ-Provenance</h3>"},
            canClick() { return player.hpr.rankGain[3].gt(0) && (!hasMilestone("hre", 11) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[3] = player.hpr.rank[3].add(player.hpr.rankGain[3])

                // RESET CODE
                for (let i = 0; i < 3; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 11) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        5: {
            title() { return "<h2>Reset prior provenances,<br>but gain ε-Provenance.</h2><br><h3>Req: " + formatWhole(player.hpr.rankReq[4]) + " δ-Provenance</h3>"},
            canClick() { return player.hpr.rankGain[4].gt(0) && (!hasMilestone("hre", 14) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[4] = player.hpr.rank[4].add(player.hpr.rankGain[4])

                // RESET CODE
                for (let i = 0; i < 4; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 14) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
        },
        6: {
            title() { return "<h2>Reset prior provenances,<br>but gain ζ-Provenance.</h2><br><h3>Req: " + formatWhole(player.hpr.rankReq[5]) + " ε-Provenance</h3>"},
            canClick() { return player.hpr.rankGain[5].gt(0) && (!hasMilestone("hre", 18) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                player.hpr.rank[5] = player.hpr.rank[5].add(player.hpr.rankGain[5])

                // RESET CODE
                for (let i = 0; i < 5; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "250px", minHeight: "75px", fontSize: "7px", border: "0px", borderRadius: "0px 0px 8px 8px"}
                if (hasMilestone("hre", 18) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                return look
            },
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
            ["raw-html", "Hex of Provenance", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#001d4c", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
            ["row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[0]) + " α-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[0]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hpr.rank[0].gte(1200) && player.hpr.rank[0].lt(6000000) ? "[SOFTLOCKED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "5px"}],
                        ["raw-html", () => {return player.hpr.rank[0].gte(6000000) && player.hpr.rank[0].lt(2.4e8) ? "[SOFTLOCKED<sup>2</sup>]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "5px"}],
                        ["raw-html", () => {return player.hpr.rank[0].gte(2.4e8) ? "[SOFTLOCKED<sup>3</sup>]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "5px"}],
                    ]],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[0][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[0][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 1],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[1]) + " β-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[1]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[1][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[1][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 2],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[2]) + " γ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[2]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[2][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[2][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 3],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
        ]],
        ["row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[3]) + " δ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[3]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[3][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[3][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 4],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[4]) + " ε-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[4]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[4][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[4][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 5],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return formatWhole(player.hpr.rank[5]) + " ζ-Provenance"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.hpr.rankGain[5]) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "50px", borderBottom: "2px solid white"}],
                ["style-column", [
                   ["raw-html", () => {return "x" + format(player.hpr.rankEffect[5][0]) + " celestial points<br>x" + format(player.hpr.rankEffect[5][1]) + " hex points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "250px", height: "76px", borderBottom: "2px solid white"}],
                ["clickable", 6],
            ], {width: "250px", height: "205px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
        ]],
        ["row", [
            ["style-row", [
                ["style-row", [
                    ["raw-html", "Total Celestial Point Multiplier", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "200px", height: "40px", borderRight: "2px solid white"}],
                ["style-row", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[0][0].mul(player.hpr.rankEffect[1][0]).mul(player.hpr.rankEffect[2][0]).mul(player.hpr.rankEffect[3][0]).mul(player.hpr.rankEffect[4][0]).mul(player.hpr.rankEffect[5][0]))}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {width: "183px", height: "40px"}],
            ], {width: "385px", height: "40px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
            ["style-row", [
                ["style-row", [
                    ["raw-html", "Total Hex Point Multiplier", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "200px", height: "40px", borderRight: "2px solid white"}],
                ["style-row", [
                    ["raw-html", () => {return "x" + format(player.hpr.rankEffect[0][1].mul(player.hpr.rankEffect[1][1]).mul(player.hpr.rankEffect[2][1]).mul(player.hpr.rankEffect[3][1]).mul(player.hpr.rankEffect[4][1]).mul(player.hpr.rankEffect[5][1]))}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {width: "178px", height: "40px"}],
            ], {width: "380px", height: "40px", backgroundColor: "#001333", border: "2px solid white", margin: "5px", borderRadius: "10px"}],
        ]],
        ["blank", "25px"],
    ],
    layerShown() { return !inChallenge("hrm", 16) }, // Decides if this node is shown or not.
});