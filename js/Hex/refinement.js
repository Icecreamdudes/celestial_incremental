addLayer("hre", {
    name: "Hex of Refinement",
    symbol: "Rf", // Decides what text appears on the node.
    tooltip: "Refinement", // Decides the nodes tooltip
    color: "#444", // Decides the nodes color.
    nodeStyle: {backgroundColor: "black", borderColor: "#ccc", color: "#ccc"}, // Decides the nodes style, in CSS format.
    branches: ["hpr"], // Decides the nodes branches.
    startData() { return {
        refinement: new Decimal(0),
        refinementReq: new Decimal(0),
        refinementGain: new Decimal(0),
        refinementDiv: new Decimal(1),
        refinementEffect: [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]],
    }},
    update (delta) {
        player.hre.refinementDiv = new Decimal(1)
        player.hre.refinementDiv = player.hre.refinementDiv.mul(player.rf.abilityEffects[7])
        player.hre.refinementDiv = player.hre.refinementDiv.mul(player.hbl.boosterEffects[3])
        player.hre.refinementDiv = player.hre.refinementDiv.mul(buyableEffect("ta", 47))
        if (hasUpgrade("hbl", 3)) player.hre.refinementDiv = player.hre.refinementDiv.mul(upgradeEffect("hbl", 3))
        if (inChallenge("hrm", 16)) player.hre.refinementDiv = player.hre.refinementDiv.mul(player.hre.refinementEffect[1][0])
        player.hre.refinementDiv = player.hre.refinementDiv.mul(player.h.prePowerMult)

        if (player.hre.refinement.lt(90)) player.hre.refinementReq = Decimal.pow(6, player.hre.refinement).mul(1e8).div(player.hre.refinementDiv)
        if (player.hre.refinement.gte(90)) player.hre.refinementReq = Decimal.pow(1000, player.hre.refinement).div(1e190).div(player.hre.refinementDiv)
        
        if (player.h.hexPoint.lt(Decimal.div(1.08e78, player.hre.refinementDiv))) player.hre.refinementGain = player.h.hexPoint.add(1).div(1e8).mul(player.hre.refinementDiv).ln().div(new Decimal(6).ln()).add(1).sub(player.hre.refinement).floor()
        if (player.h.hexPoint.gte(Decimal.div(1.08e78, player.hre.refinementDiv))) player.hre.refinementGain = player.h.hexPoint.add(1).mul(1e190).mul(player.hre.refinementDiv).ln().div(new Decimal(1000).ln()).add(1).sub(player.hre.refinement).floor()
        
        if (player.hre.refinementGain.lt(1)) player.hre.refinementGain = new Decimal(0)

        if (hasMilestone("hre", 4) && !inChallenge("hrm", 15)) player.hre.refinement = player.hre.refinement.add(player.hre.refinementGain)

        player.hre.refinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
        if (player.hre.refinement.gte(1) || hasMilestone("hre", 1)) {
            if (!hasUpgrade("hpw", 81)) player.hre.refinementEffect[0][0] = Decimal.pow(1.3, player.hre.refinement.pow(0.8)).mul(2)
            if (hasUpgrade("hpw", 81)) player.hre.refinementEffect[0][0] = Decimal.pow(1.4, player.hre.refinement.pow(0.8)).mul(3)
            player.hre.refinementEffect[0][1] = Decimal.pow(2, player.hre.refinement).mul(2)
        }
        if (inChallenge("hrm", 12)) {
            player.hre.refinementEffect[0][0] = player.hre.refinementEffect[0][0].pow(player.hpu.purifierEffects[3])
            player.hre.refinementEffect[0][1] = player.hre.refinementEffect[0][1].pow(player.hpu.purifierEffects[3])
        }
        if (inChallenge("hrm", 16)) {
            let effPow = player.hre.refinementEffect[2][0]
            if (hasUpgrade("hbl", 6)) effPow = effPow.add(upgradeEffect("hbl", 6))
            if (hasMilestone("hbl", 5)) effPow = effPow.add(0.3)
            if (hasUpgrade("hpw", 102)) effPow = effPow.add(upgradeEffect("hpw", 102))
            if (hasUpgrade("hpw", 132)) effPow = effPow.add(0.5)
            player.hre.refinementEffect[0][0] = player.hre.refinementEffect[0][0].pow(effPow)
            player.hre.refinementEffect[0][1] = player.hre.refinementEffect[0][1].pow(effPow)
        }

        if (player.hre.refinement.gte(3) && player.hre.refinement.lt(60)) player.hre.refinementEffect[1][0] = Decimal.pow(1.15, player.hre.refinement.sub(2).pow(0.6)).pow(player.hpu.purifierEffects[0])
        if (player.hre.refinement.gte(60)) player.hre.refinementEffect[1][0] = Decimal.pow(1.1, player.hre.refinement.pow(0.3)).add(3.56).pow(player.hpu.purifierEffects[0])
        if (inChallenge("hrm", 16)) player.hre.refinementEffect[1][0] = Decimal.pow(1.36, player.hre.refinement.sub(2).pow(0.8)).pow(player.hpu.purifierEffects[0])
        if (player.hre.refinement.gte(3)) player.hre.refinementEffect[1][1] = Decimal.pow(1.9, player.hre.refinement.sub(2)).pow(player.hpu.purifierEffects[0])

        if (player.hre.refinement.gte(9)) player.hre.refinementEffect[2][0] = Decimal.pow(1.06, player.hre.refinement.sub(4).pow(0.6))
        if (player.hre.refinement.gte(9)) player.hre.refinementEffect[2][1] = Decimal.pow(1.8, player.hre.refinement.sub(4))

        if (player.hre.refinement.gte(24)) player.hre.refinementEffect[3][0] = Decimal.pow(1.6, player.hre.refinement.sub(23).pow(0.6))
        if (player.hre.refinement.gte(24)) player.hre.refinementEffect[3][1] = Decimal.pow(1.7, player.hre.refinement.sub(12))

        if (player.hre.refinement.gte(54) && !hasUpgrade("hpw", 91)) player.hre.refinementEffect[4][0] = Decimal.pow(1.3, player.hre.refinement.sub(53).pow(0.6))
        if (player.hre.refinement.gte(54) && hasUpgrade("hpw", 91)) player.hre.refinementEffect[4][0] = Decimal.pow(1.6, player.hre.refinement.sub(53).pow(0.6))
        if (player.hre.refinement.gte(54)) player.hre.refinementEffect[4][1] = Decimal.pow(1.6, player.hre.refinement.sub(27))

        if (player.hre.refinement.gte(90)) player.hre.refinementEffect[5][0] = player.hre.refinement.sub(89).mul(0.1).add(1)
        if (player.hre.refinement.gte(90)) player.hre.refinementEffect[5][1] = Decimal.pow(1.1, player.hre.refinement.sub(45).pow(0.8))

        for (let i = 0; i < 6; i++) {
            player.hre.refinementEffect[i][1] = player.hre.refinementEffect[i][1].pow(player.hpu.purifierEffects[2])
        }
    },
    clickables: {
        1: {
            title() {
                if (inChallenge("hrm", 16)) return "<h2>Refine, but reset hex points.</h2><br><h3>Req: " + format(player.hre.refinementReq) + " Hex Points</h3>"
                return "<h2>Refine, but reset hex points and provenance.</h2><br><h3>Req: " + format(player.hre.refinementReq) + " Hex Points</h3>"
            },
            canClick() { return player.hre.refinementGain.gte(1) && (!hasMilestone("hre", 4) || inChallenge("hrm", 15))},
            unlocked: true,
            onClick() {
                if (!hasMilestone("hre", 0)) player.hre.refinement = player.hre.refinement.add(1)
                if (hasMilestone("hre", 0)) player.hre.refinement = player.hre.refinement.add(player.hre.refinementGain)

                // RESET CODE
                for (let i = 0; i < 6; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: "2px solid white", borderRadius: "15px"}
                if (hasMilestone("hre", 4) && !inChallenge("hrm", 15)) look.cursor = "default !important"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "<h3>12 Refinements",
            effectDescription: "Unlocks buy max refinements.",
            done() { return player.hre.refinement.gte(12)},
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        1: {
            requirementDescription: "<h3>18 Refinements",
            effectDescription: "1st refiner no longer requires a refinement.",
            done() { return player.hre.refinement.gte(18)},
            unlocked() { return hasMilestone("hre", 0) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        2: {
            requirementDescription: "<h3>24 Refinements",
            effectDescription: "Booster progress slightly boosts Booster effect.",
            done() { return player.hre.refinement.gte(24)},
            unlocked() { return hasMilestone("hre", 1) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        3: {
            requirementDescription: "<h3>30 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate α-Provenance gain."
            },
            done() { return player.hre.refinement.gte(30)},
            unlocked() { return hasMilestone("hre", 2) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        4: {
            requirementDescription: "<h3>36 Refinements",
            effectDescription: "Automate refinement gain.",
            done() { return player.hre.refinement.gte(36)},
            unlocked() { return hasMilestone("hre", 3) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        5: {
            requirementDescription: "<h3>42 Refinements",
            effectDescription: "Unlock blessing autoclicker.",
            done() { return player.hre.refinement.gte(42)},
            unlocked() { return hasMilestone("hre", 4) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        6: {
            requirementDescription: "<h3>48 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate β-Provenance gain."
            },
            done() { return player.hre.refinement.gte(48)},
            unlocked() { return hasMilestone("hre", 5) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        7: {
            requirementDescription: "<h3>54 Refinements",
            effectDescription: "Unlock deposit rate controls.",
            done() { return player.hre.refinement.gte(54)},
            unlocked() { return hasMilestone("hre", 6) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        8: {
            requirementDescription: "<h3>60 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate γ-Provenance gain."
            },
            done() { return player.hre.refinement.gte(60)},
            unlocked() { return hasMilestone("hre", 7) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        9: {
            requirementDescription: "<h3>66 Refinements",
            effectDescription: "+0.6 base curse gain.",
            done() { return player.hre.refinement.gte(66)},
            unlocked() { return hasMilestone("hre", 8) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        10: {
            requirementDescription: "<h3>72 Refinements",
            effectDescription: "Unlock purifier level amount controls.",
            done() { return player.hre.refinement.gte(72)},
            unlocked() { return hasMilestone("hre", 9) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        11: {
            requirementDescription: "<h3>78 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate δ-Provenance gain."
            },
            done() { return player.hre.refinement.gte(78)},
            unlocked() { return hasMilestone("hre", 10) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        12: {
            requirementDescription: "<h3>84 Refinements",
            effectDescription: "Unlock minimum refinement for booster autoclicker.",
            done() { return player.hre.refinement.gte(84)},
            unlocked() { return hasMilestone("hre", 11) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        13: {
            requirementDescription: "<h3>90 Refinements",
            effectDescription: "Unlock buy max purity.",
            done() { return player.hre.refinement.gte(90)},
            unlocked() { return hasMilestone("hre", 12) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        14: {
            requirementDescription: "<h3>96 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate ε-Provenance gain."
            },
            done() { return player.hre.refinement.gte(96)},
            unlocked() { return hasMilestone("hre", 13) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        15: {
            requirementDescription: "<h3>102 Refinements",
            effectDescription: "Automate purity gain.",
            done() { return player.hre.refinement.gte(102)},
            unlocked() { return hasMilestone("hre", 14) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        16: {
            requirementDescription: "<h3>108 Refinements",
            effectDescription: "Unlock buy max vex.",
            done() { return player.hre.refinement.gte(108)},
            unlocked() { return hasMilestone("hre", 15) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        17: {
            requirementDescription: "<h3>114 Refinements",
            effectDescription: "Automate jinxes.",
            done() { return player.hre.refinement.gte(114)},
            unlocked() { return hasMilestone("hre", 16) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        18: {
            requirementDescription: "<h3>120 Refinements",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Automate █-██████████ gain."
                return "Automate ζ-Provenance gain."
            },
            done() { return player.hre.refinement.gte(120)},
            unlocked() { return hasMilestone("hre", 17) },
            style: {width: "500px", height: "50px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
    },
    microtabs: {
        refine: {
            "Refiners": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["row", [
                        ["raw-html", () => {return player.hre.refinement.lt(1) && !hasMilestone("hre", 1) ? "Next refiner at 1 refinement" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return (player.hre.refinement.gte(1) || hasMilestone("hre", 1)) && player.hre.refinement.lt(3) ? "Next refiner at 3 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hre.refinement.gte(3) && player.hre.refinement.lt(9) ? "Next refiner at 9 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hre.refinement.gte(9) && player.hre.refinement.lt(24) ? "Next refiner at 24 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hre.refinement.gte(24) && player.hre.refinement.lt(54) ? "Next refiner at 54 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hre.refinement.gte(54) && player.hre.refinement.lt(90) ? "Next refiner at 90 refinements" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ]],
                    ["blank", "5px"],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 1", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[0][0]) + "<br>Hex Points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[0][1]) + "<br>Factor Power"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(1) || hasMilestone("hre", 1) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 2", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return inChallenge("hrm", 16) ? "/" + format(player.hre.refinementEffect[1][0]) + "<br>Refinement Req" : "/" + format(player.hre.refinementEffect[1][0]) + "<br>Provenance Req's"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[1][1]) + "<br>Prestige Points"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(3) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 3", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return inChallenge("hrm", 16) ? "^" + format(player.hre.refinementEffect[2][0]) + "<br>Refiner 1 Effects" : "x" + format(player.hre.refinementEffect[2][0]) + "<br>Provenance Effects"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[2][1]) + "<br>Trees"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(9) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 4", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[3][0]) + "<br>Boons"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[3][1]) + "<br>Grass"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(24) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                    ]],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 5", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[4][0]) + "<br>Blessings"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[4][1]) + "<br>Grasshoppers"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(54) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Refiner 6", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "36px", backgroundColor: "#333", borderBottom: "2px solid white", borderRadius: "10px 10px 0px 0px"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[5][0]) + "<br>Power"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return "x" + format(player.hre.refinementEffect[5][1]) + "<br>Pre-OTF"}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "150px", height: "40px"}],
                        ], () => {return player.hre.refinement.gte(90) ? {width: "150px", height: "120px", backgroundColor: "#222", border: "2px solid white", margin: "5px", borderRadius: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Milestones": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["raw-html", "Milestones kept on later resets.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["milestone", 0],
                    ["milestone", 1],
                    ["milestone", 2],
                    ["milestone", 3],
                    ["milestone", 4],
                    ["milestone", 5],
                    ["milestone", 6],
                    ["milestone", 7],
                    ["milestone", 8],
                    ["milestone", 9],
                    ["milestone", 10],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                ]
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
            ["raw-html", "Hex of Refinement", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#333", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return player.hre.refinement.neq(1) ? "You are at <h3>" + formatWhole(player.hre.refinement) + "</h3> refinements." : "You are at <h3>" + formatWhole(player.hre.refinement) + "</h3> refinement." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return hasMilestone("hre", 0) ? "(+" + formatWhole(player.hre.refinementGain) + ")" : "" }, () => {
                let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.hre.refinementGain.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
            ["raw-html", () => {return player.hre.refinement.gte(90) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "5px"],
        ["microtabs", "refine", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return true }, // Decides if this node is shown or not.
});