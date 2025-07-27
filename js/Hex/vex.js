const VEXROW = [1, 2, 1, 3, 2, 1, 4, 3, 2, 4, 5, 3, 4, 6, 5, 6, 5, 6]
addLayer("hve", {
    name: "Hex of Vexes",
    symbol: "Ve", // Decides what text appears on the node.
    tooltip: "Vexes", // Decides the nodes tooltip
    color: "#808", // Decides the nodes color.
    branches: ["hcu"], // Decides the nodes branches.
    startData() { return {
        vex: new Decimal(0),
        vexTotal: new Decimal(0),
        vexReq: new Decimal(300),
        vexGain: new Decimal(0),
        vexDiv: new Decimal(1),
        vexEffects: [new Decimal(0), new Decimal(1)],

        rowCurrent: [0, 0, 0, 0, 0, 0],
        rowSpent: [0, 0, 0, 0, 0, 0],
    }},
    update(delta) {
        player.hve.vexReq = Decimal.pow(1e6, player.hve.vexTotal).mul(1e60).div(player.hve.vexDiv)
        player.hve.vexGain = player.hcu.curses.add(1).div(1e60).mul(player.hve.vexDiv).ln().div(new Decimal(1e6).ln()).add(1).sub(player.hve.vexTotal).floor()
        if (player.hve.vexGain.lt(1)) player.hve.vexGain = new Decimal(0)

        player.hve.vexEffects = [new Decimal(0), new Decimal(1)]
        player.hve.vexEffects[0] = player.hve.vexTotal.mul(2)
        if (hasUpgrade("hpw", 62)) player.hve.vexEffects[1] = player.hve.vexTotal.mul(0.05).add(1)
    },
    clickables: {
        1: {
            title() { return "<h3>Vex, but reset pre-power content.<br><small>Req: " + format(player.hve.vexReq) + " curses</small></h3>"},
            canClick() { return player.hve.vexGain.gte(1)},
            unlocked: true,
            onClick() {
                if (!hasMilestone("hre", 16)) {
                    player.hve.vexTotal = player.hve.vexTotal.add(1)
                    player.hve.vex = player.hve.vex.add(1)
                }
                if (hasMilestone("hre", 16)) {
                    player.hve.vexTotal = player.hve.vexTotal.add(player.hve.vexGain)
                    player.hve.vex = player.hve.vex.add(player.hve.vexGain)
                }

                let rowTot = [0, 0, 0, 0, 0, 0]
                let rowVal = VEXROW.slice(0, player.hve.vexTotal)
                rowVal.forEach((x) => {rowTot[x-1] = rowTot[x-1]+1})
                for (i = 0; i < 6; i++) {
                    player.hve.rowCurrent[i] = rowTot[i] - player.hve.rowSpent[i]
                }

                layers.hpw.powerReset(2)
            },
            style() {
                let look = {width: "300px", minHeight: "80px", border: "2px solid black", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#404" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        2: {
            title() { return "Respec your vexes<br><small style='font-size:11px'>(Does a vex reset)</small>"},
            canClick() { return player.hve.rowSpent.some((x) => x > 0)},
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to do a vex reset?")) {
                    player.hve.vex = player.hve.vexTotal
                    for (i = 0; i < 6; i++) {
                        player.hve.rowCurrent[i] = player.hve.rowCurrent[i] + player.hve.rowSpent[i]
                        player.hve.rowSpent[i] = 0
                    }
                    for (let i = 0; i < player.hve.upgrades.length; i++) {
                        player.hve.upgrades.splice(i, 1);
                        i--;
                    }
                    layers.hpw.powerReset(2)
                }
            },
            style() {
                let look = {width: "250px", minHeight: "40px", lineHeight: "0.9", border: "2px solid black", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#404" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    upgrades: {
        11: {
            fullDisplay() { return "Hex Points are multiplied by<br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Hex Points)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[0] > 0},
            onPurchase() {
                player.hve.rowSpent[0] = player.hve.rowSpent[0] + 1
                player.hve.rowCurrent[0] = player.hve.rowCurrent[0] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                let eff = player.h.hexPoint.div(1e36).add(1).log(1e6).pow(0.6).add(1).mul(2)
                if (hasUpgrade("hve", 41)) eff = eff.pow(upgradeEffect("hve", 41))
                return eff
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        12: {
            fullDisplay() { return "Hex Points are multiplied by<br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Blessings)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[0] > 0},
            onPurchase() {
                player.hve.rowSpent[0] = player.hve.rowSpent[0] + 1
                player.hve.rowCurrent[0] = player.hve.rowCurrent[0] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                let eff = player.hbl.blessings.div(1e5).add(1).log(36).pow(0.6).add(1).mul(2)
                if (hasUpgrade("hve", 42)) eff = eff.pow(upgradeEffect("hve", 42))
                return eff
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        13: {
            fullDisplay() { return "Hex Points are multiplied by<br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Curses)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[0] > 0},
            onPurchase() {
                player.hve.rowSpent[0] = player.hve.rowSpent[0] + 1
                player.hve.rowCurrent[0] = player.hve.rowCurrent[0] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                let eff = player.hcu.curses.div(1e30).add(1).log(1e12).pow(0.6).add(1).mul(2)
                if (hasUpgrade("hve", 43)) eff = eff.pow(upgradeEffect("hve", 43))
                return eff
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        21: {
            fullDisplay() { return "Gain 3 free<br>Α-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[1] > 0},
            onPurchase() {
                player.hve.rowSpent[1] = player.hve.rowSpent[1] + 1
                player.hve.rowCurrent[1] = player.hve.rowCurrent[1] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        22: {
            fullDisplay() { return "Gain 9 free<br>Β-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[1] > 0},
            onPurchase() {
                player.hve.rowSpent[1] = player.hve.rowSpent[1] + 1
                player.hve.rowCurrent[1] = player.hve.rowCurrent[1] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        23: {
            fullDisplay() { return "Gain 4 free<br>Γ-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[1] > 0},
            onPurchase() {
                player.hve.rowSpent[1] = player.hve.rowSpent[1] + 1
                player.hve.rowCurrent[1] = player.hve.rowCurrent[1] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        31: {
            fullDisplay() { return "Blessings are tripled"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[2] > 0},
            onPurchase() {
                player.hve.rowSpent[2] = player.hve.rowSpent[2] + 1
                player.hve.rowCurrent[2] = player.hve.rowCurrent[2] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        32: {
            fullDisplay() { return "Blessing boosters base is increased by +0.16"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[2] > 0},
            onPurchase() {
                player.hve.rowSpent[2] = player.hve.rowSpent[2] + 1
                player.hve.rowCurrent[2] = player.hve.rowCurrent[2] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        33: {
            fullDisplay() { return "Multiplied Miracles and Amended Automation gain a free level"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[2] > 0},
            onPurchase() {
                player.hve.rowSpent[2] = player.hve.rowSpent[2] + 1
                player.hve.rowCurrent[2] = player.hve.rowCurrent[2] - 1
                player.hpu.purifier[1] = player.hpu.purifier[1].add(1)
                player.hpu.purifier[4] = player.hpu.purifier[4].add(1)
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        41: {
            fullDisplay() { return "Vex 11 is raised to the power of <br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Refinement)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[3] > 0},
            onPurchase() {
                player.hve.rowSpent[3] = player.hve.rowSpent[3] + 1
                player.hve.rowCurrent[3] = player.hve.rowCurrent[3] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                return player.hre.refinement.div(3).pow(0.6).div(6).add(1)
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        42: {
            fullDisplay() { return "Vex 12 is raised to the power of <br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Boons)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[3] > 0},
            onPurchase() {
                player.hve.rowSpent[3] = player.hve.rowSpent[3] + 1
                player.hve.rowCurrent[3] = player.hve.rowCurrent[3] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                return player.hbl.boons.add(1).log(12).pow(0.6).div(6).add(1)
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        43: {
            fullDisplay() { return "Vex 13 is raised to the power of <br>" + format(upgradeEffect(this.layer, this.id)) + "<br>(Increases with Jinx Score)"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[3] > 0},
            onPurchase() {
                player.hve.rowSpent[3] = player.hve.rowSpent[3] + 1
                player.hve.rowCurrent[3] = player.hve.rowCurrent[3] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            effect() {
                return player.hcu.jinxTotal.div(15).pow(0.6).div(6).add(1)
            },
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        51: {
            fullDisplay() { return "Gain 6 free<br>Η-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[4] > 0},
            onPurchase() {
                player.hve.rowSpent[4] = player.hve.rowSpent[4] + 1
                player.hve.rowCurrent[4] = player.hve.rowCurrent[4] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        52: {
            fullDisplay() { return "Gain 3 free<br>Θ-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[4] > 0},
            onPurchase() {
                player.hve.rowSpent[4] = player.hve.rowSpent[4] + 1
                player.hve.rowCurrent[4] = player.hve.rowCurrent[4] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        53: {
            fullDisplay() { return "Gain 3 free<br>Ι-Jinxes"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[4] > 0},
            onPurchase() {
                player.hve.rowSpent[4] = player.hve.rowSpent[4] + 1
                player.hve.rowCurrent[4] = player.hve.rowCurrent[4] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        61: {
            fullDisplay() { return "Hex Points are raised to the power of 1.03"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[5] > 0},
            onPurchase() {
                player.hve.rowSpent[5] = player.hve.rowSpent[5] + 1
                player.hve.rowCurrent[5] = player.hve.rowCurrent[5] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        62: {
            fullDisplay() { return "Blessings are raised to the power of 1.03"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[5] > 0},
            onPurchase() {
                player.hve.rowSpent[5] = player.hve.rowSpent[5] + 1
                player.hve.rowCurrent[5] = player.hve.rowCurrent[5] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
        63: {
            fullDisplay() { return "Curses are raised to the power of 1.03"},
            unlocked: true,
            cost() {return new Decimal(1)},
            canAfford() { return player.hve.rowCurrent[5] > 0},
            onPurchase() {
                player.hve.rowSpent[5] = player.hve.rowSpent[5] + 1
                player.hve.rowCurrent[5] = player.hve.rowCurrent[5] - 1
            },
            currencyLocation() { return player.hve },
            currencyDisplayName: "Vex",
            currencyInternalName: "vex",
            style: {width: "110px", minHeight: "110px", margin: "5px", borderRadius: "50%"},
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Vexes", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#404", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "20px"],
        ["style-row", [
            ["always-scroll-column", [
                ["blank", "10px"],
                ["clickable", 2],
                ["blank", "5px"],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 1", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[0]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 11], ["id-upgrade", 12], ["id-upgrade", 13]
                ]],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 2", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[1]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 21], ["id-upgrade", 22], ["id-upgrade", 23]
                ]],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 3", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[2]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 31], ["id-upgrade", 32], ["id-upgrade", 33]
                ]],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 4", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[3]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 41], ["id-upgrade", 42], ["id-upgrade", 43]
                ]],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 5", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[4]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 51], ["id-upgrade", 52], ["id-upgrade", 53]
                ]],
                ["row", [
                    ["style-column", [
                        ["raw-html", "Row 6", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatWhole(player.hve.rowCurrent[5]) + " Available"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "90px", height: "120px"}],
                    ["id-upgrade", 61], ["id-upgrade", 62], ["id-upgrade", 63]
                ]],
            ], {width: "472px", height: "600px", backgroundColor: "#101", borderRight: "3px solid white", borderRadius: "15px 0 0 15px"}],
            ["column", [
                ["style-column", [
                    ["row", [
                        ["raw-html", () => {return "You have " + formatWhole(player.hve.vex) + "/" + formatWhole(player.hve.vexTotal) + " Vexes."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasMilestone("hre", 16) ? "(+" + formatWhole(player.hve.vexGain) + ")" : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return player.hve.vexTotal.lt(18) ? "The next Vex will go in Row " + VEXROW[player.hve.vexTotal.toNumber()] + "." : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "20px"],
                    ["clickable", 1],
                ], {width: "325px", height: "200px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Vex Effects", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "300px", height: "48px", borderBottom: "2px solid #808"}],
                        ["scroll-column", [
                            ["blank", "10px"],
                            ["raw-html", () => {return "Jinx Cap: +" + formatWhole(player.hve.vexEffects[0])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("hpw", 62) ? "Jinx Score: x" + format(player.hve.vexEffects[1]) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "300px", height: "330px"}],
                    ], {width: "300px", height: "380px", backgroundColor: "#101", border: "2px solid #808", borderRadius: "15px"}],
                ], {width: "300px", height: "400px"}],
            ], {width: "325px", height: "600px"}],
        ], {backgroundColor: "#202", border: "3px solid white", borderRadius: "15px"}],
    ],
    layerShown() { return hasUpgrade("hpw", 42) }, // Decides if this node is shown or not.
});