addLayer("bpl", {
    name: "Pollen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PL", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        pollen: new Decimal(0), // Currency Pollen

        pollenTimer: new Decimal(0), // Pollen Timer
        pollenTimerMax: new Decimal(5), // Pollen Timer Max

        pollenGain: new Decimal(1), // Pollen per Flower

        roles: {
            drone: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(0),
            },
            worker: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(0),
            },
            queen: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(0),
            },
            empress: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            }
        },
    }},
    automate() {
        if ((hasUpgrade("al", 115) && player.bee.path == 1) || (hasUpgrade("al", 227) && player.bee.path == 2)) {
            buyUpgrade("bpl", 11)
            buyUpgrade("bpl", 12)
            buyUpgrade("bpl", 13)
            buyUpgrade("bpl", 14)
            buyUpgrade("bpl", 15)
            buyUpgrade("bpl", 16)
            buyUpgrade("bpl", 17)
            buyUpgrade("bpl", 18)
            buyUpgrade("bpl", 19)
            buyUpgrade("bpl", 20)
        }
    },
    nodeStyle() {
        return {borderColor: "#7f6b4e"}
    },
    tooltip: "Pollen",
    color: "#ffd69c",
    branches: ["bee"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bpl" && player.bee.path == 0 && !player.bee.extremePath) player.bee.path = 1

        // Pollen per Flower Calculations
        player.bpl.pollenGain = new Decimal(1)
        if (player.bee.path != 1) player.bpl.pollenGain = new Decimal(0.001)
        player.bpl.pollenGain = player.bpl.pollenGain.mul(player.fl.glossaryEffects.pollen)
        player.bpl.pollenGain = player.bpl.pollenGain.mul(buyableEffect("bee", 31))
        player.bpl.pollenGain = player.bpl.pollenGain.mul(player.bpl.roles.worker.effect)
        if (hasUpgrade("bpl", 11)) player.bpl.pollenGain = player.bpl.pollenGain.mul(2)
        if (hasUpgrade("bpl", 15)) player.bpl.pollenGain = player.bpl.pollenGain.mul(upgradeEffect("bpl", 15))
        if (player.bb.breadMilestone >= 2) player.bpl.pollenGain = player.bpl.pollenGain.mul(player.bb.breadEffects[1])
        player.bpl.pollenGain = player.bpl.pollenGain.mul(buyableEffect("al", 101))
        if (hasUpgrade("al", 108)) player.bpl.pollenGain = player.bpl.pollenGain.mul(upgradeEffect("al", 108))
        if (hasUpgrade("bpl", 20)) player.bpl.pollenGain = player.bpl.pollenGain.mul(upgradeEffect("bpl", 20))
        player.bpl.pollenGain = player.bpl.pollenGain.mul(player.ne.epsilon.effect)
        player.bpl.pollenGain = player.bpl.pollenGain.mul(player.ho.effects.pollen.effect)
        player.bpl.pollenGain = player.bpl.pollenGain.mul(player.bee.preAlephMult)

        // POWER MODIFIERS
        if (hasUpgrade("al", 126)) player.bpl.pollenGain = player.bpl.pollenGain.pow(1.01)

        // Pollen Timer Calculations
        player.bpl.pollenTimerMax = new Decimal(5)
        if (hasUpgrade("bpl", 12)) player.bpl.pollenTimerMax = player.bpl.pollenTimerMax.sub(0.5)
        if (hasUpgrade("bpl", 17)) player.bpl.pollenTimerMax = player.bpl.pollenTimerMax.sub(0.5)
        player.bpl.pollenTimerMax = player.bpl.pollenTimerMax.div(buyableEffect("bee", 32))
        if (player.bb.breadMilestone >= 3) player.bpl.pollenTimerMax = player.bpl.pollenTimerMax.div(player.bb.breadEffects[2])

        if (tmp.bpl.layerShown && !hasUpgrade("al", 112) && (player.bee.path != 0 || player.bee.extremePath)) player.bpl.pollenTimer = player.bpl.pollenTimer.add(onepersec.mul(delta))
        if (player.bpl.pollenTimer.gte(player.bpl.pollenTimerMax)) {
            player.bpl.pollenTimer = new Decimal(0)
            player.bpl.pollen = player.bpl.pollen.add(player.bpl.pollenGain)
        }

        // Pollen Per Second
        if (tmp.bpl.layerShown && hasUpgrade("al", 112) && (player.bee.path != 0 || player.bee.extremePath)) {
            let percent = new Decimal(0.2)
            if (hasUpgrade("bpl", 12)) percent = percent.add(0.05)
            if (hasUpgrade("bpl", 17)) percent = percent.add(0.05)
            percent = percent.mul(buyableEffect("bee", 32))
            if (player.bb.breadMilestone >= 3) percent = percent.mul(player.bb.breadEffects[2])

            player.bpl.pollenGain = player.bpl.pollenGain.mul(percent)
            player.bpl.pollen = player.bpl.pollen.add(player.bpl.pollenGain.mul(delta))
        }

        let eff = new Decimal(1)
        eff = eff.mul(player.bpl.roles.queen.effect)
        eff = eff.mul(buyableEffect("bee", 33))
        if (player.bb.breadMilestone >= 5) eff = eff.mul(player.bb.breadEffects[4])
        // Bee Role Gain Calculations
        if (player.bee.path == 1) {
            player.bpl.roles.drone.gain = player.bpl.pollen.div(5).mul(eff)
            player.bpl.roles.worker.gain = player.bpl.pollen.div(100).mul(eff)
            player.bpl.roles.queen.gain = player.bpl.pollen.div(5000).mul(eff)
            player.bpl.roles.empress.gain = player.bpl.pollen.div(1e175).mul(eff).pow(0.2)
        } else {
            player.bpl.roles.drone.gain = player.bpl.pollen.pow(0.5).div(125).mul(eff)
            player.bpl.roles.worker.gain = player.bpl.pollen.pow(0.5).div(1e6).mul(eff)
            player.bpl.roles.queen.gain = player.bpl.pollen.pow(0.5).div(1.25e10).mul(eff)
            player.bpl.roles.empress.gain = player.bpl.pollen.div("1e525").mul(eff).pow(0.1)
        }

        // Bee Role Effect Calculations
        if (player.bpl.roles.drone.amount.gte(1e100)) {
            player.bpl.roles.drone.effect = player.bpl.roles.drone.amount.pow(0.3).mul(1e47).add(1)
        } else if (player.bpl.roles.drone.amount.gte(1e60)) {
            player.bpl.roles.drone.effect = player.bpl.roles.drone.amount.pow(0.65).mul(1e12).add(1)
        } else {
            player.bpl.roles.drone.effect = player.bpl.roles.drone.amount.pow(0.85).add(1)
        }

        if (player.bpl.roles.worker.amount.lt(1e30)) {
            player.bpl.roles.worker.effect = player.bpl.roles.worker.amount.pow(0.7).add(1)
        } else {
            player.bpl.roles.worker.effect = player.bpl.roles.worker.amount.pow(0.5).mul(1e6).add(1)
        }

        player.bpl.roles.queen.effect = player.bpl.roles.queen.amount.add(1).log(10).add(1)
        if (hasUpgrade("al", 104)) player.bpl.roles.queen.effect = player.bpl.roles.queen.effect.add(player.bpl.roles.queen.amount.pow(0.15))
        player.bpl.roles.empress.effect = player.bpl.roles.empress.amount.add(1).log(10).div(4).add(1)

        // Bee Role Automation
        if (hasUpgrade("al", 103)) player.bpl.roles.drone.amount = player.bpl.roles.drone.amount.add(player.bpl.roles.drone.gain.mul(delta))
        if (hasUpgrade("al", 106) && hasUpgrade("bpl", 13)) player.bpl.roles.worker.amount = player.bpl.roles.worker.amount.add(player.bpl.roles.worker.gain.div(2).mul(delta))
        if (hasUpgrade("al", 109) && hasUpgrade("bpl", 16)) player.bpl.roles.queen.amount = player.bpl.roles.queen.amount.add(player.bpl.roles.queen.gain.div(4).mul(delta))
        if (hasUpgrade("al", 124)) player.bpl.roles.empress.amount = player.bpl.roles.empress.amount.add(player.bpl.roles.empress.gain.div(10).mul(delta))
    },
    clickables: {
        11: {
            title: "Convert your Pollen into Drone Bees",
            tooltip() {return "+" + formatSimple(player.bpl.roles.drone.gain, 1) + "<br>On Conversion"},
            canClick() {return player.bpl.roles.drone.gain.gte(0.01)},
            unlocked: true,
            onClick() {
                player.bpl.roles.drone.amount = player.bpl.roles.drone.amount.add(player.bpl.roles.drone.gain)
                player.bpl.pollen = new Decimal(0)
            },
            style: { width: '175px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px' },
        },
        12: {
            title: "Convert your Pollen into Worker Bees",
            tooltip() {return "+" + formatSimple(player.bpl.roles.worker.gain, 1) + "<br>On Conversion"},
            canClick() { return hasUpgrade("bpl", 13) && player.bpl.roles.worker.gain.gte(0.01)},
            unlocked: true,
            onClick() {
                player.bpl.roles.worker.amount = player.bpl.roles.worker.amount.add(player.bpl.roles.worker.gain)
                player.bpl.pollen = new Decimal(0)
            },
            style: { width: '175px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px' },
        },
        13: {
            title: "Convert your Pollen into Queen Bees",
            tooltip() {return "+" + formatSimple(player.bpl.roles.queen.gain, 1) + "<br>On Conversion"},
            canClick() { return hasUpgrade("bpl", 16) && player.bpl.roles.queen.gain.gte(0.01)},
            unlocked: true,
            onClick() {
                player.bpl.roles.queen.amount = player.bpl.roles.queen.amount.add(player.bpl.roles.queen.gain)
                player.bpl.pollen = new Decimal(0)
            },
            style: { width: '175px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px' },
        },
        14: {
            title: "Convert your Pollen into Empress Bees",
            tooltip() {return "+" + formatSimple(player.bpl.roles.empress.gain, 1) + "<br>On Conversion"},
            canClick() { return hasUpgrade("al", 120) && player.bpl.roles.empress.gain.gte(0.01)},
            unlocked: true,
            onClick() {
                player.bpl.roles.empress.amount = player.bpl.roles.empress.amount.add(player.bpl.roles.empress.gain)
                player.bpl.pollen = new Decimal(0)
            },
            style: { width: '175px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px' },
        },
    },
    bars: {
        pollenBar: {
            unlocked() { return !hasUpgrade("al", 112) },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.bpl.pollenTimer.div(player.bpl.pollenTimerMax)
            },
            baseStyle: {
                backgroundColor: "rgba(0,0,0,0.5)",
            },
            fillStyle: {
                "background-color": "#7f6b4e",
            },
            display() {
                return "Time: " + formatTime(player.bpl.pollenTimer) + "/" + formatTime(player.bpl.pollenTimerMax);
            },
        },
    },
    upgrades: {
        11: {
            title: "Pollen Upgrade I",
            unlocked: true,
            description: "Doubles pollen gain.",
            cost() {
                if (player.bee.path != 1) return new Decimal(125)
                return new Decimal(5)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Pollen Upgrade II",
            unlocked: true,
            description() {
                if (hasUpgrade("al", 112)) return "Increase pollen per second by +5%."
                return "Reduce base pollen cooldown by 0.5s."
            },
            cost() {
                if (player.bee.path != 1) return new Decimal(3375)
                return new Decimal(15)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Pollen Upgrade III",
            unlocked: true,
            description: "Unlock Worker Bees.",
            cost() {
                if (player.bee.path != 1) return new Decimal(125000)
                return new Decimal(50)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Pollen Upgrade IV",
            unlocked: true,
            description: "Unlock blue flowers.",
            cost() {
                if (player.bee.path != 1) return new Decimal(3375000)
                return new Decimal(150)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Pollen Upgrade V",
            unlocked: true,
            description: "Boost Pollen based on total Research.",
            cost() {
                if (player.bee.path != 1) return new Decimal(1e9)
                return new Decimal(1000)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            effect() {
                return player.bee.totalResearch.div(5).pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Pollen Upgrade VI",
            unlocked: true,
            description: "Unlock Queen Bees.",
            cost() {
                if (player.bee.path != 1) return new Decimal(1.5625e13)
                return new Decimal(25000)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "Pollen Upgrade VII",
            unlocked: true,
            description() {
                if (hasUpgrade("al", 112)) return "Increase pollen per second by +5%, again."
                return "Reduce base pollen cooldown by 0.5s, again."
            },
            cost() {
                if (player.bee.path != 1) return new Decimal(1.25e17)
                return new Decimal(500000)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "Pollen Upgrade VIII",
            unlocked: true,
            description: "Decrease time between blue flower growth by /2.",
            cost() {
                if (player.bee.path != 1) return new Decimal(1.5625e19)
                return new Decimal(2500000)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "Pollen Upgrade IX",
            unlocked: true,
            description: "Unlock a new pollen research.",
            cost() {
                if (player.bee.path != 1) return new Decimal(1.25e23)
                return new Decimal(50000000)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        20: {
            title: "Pollen Upgrade X",
            unlocked() {return hasUpgrade("al", 111)},
            description: "Boost pollen based on nectar α.",
            cost() {
                if (player.bee.path != 1) return new Decimal(1e240)
                return new Decimal(1e60)
            },
            currencyLocation() { return player.bpl },
            currencyDisplayName: "Pollen",
            currencyInternalName: "pollen",
            effect() {
                return player.ne.alpha.amount.pow(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee" : "You have <h3>" + format(player.bee.bees) + "</h3> bees"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "14px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.bpl.pollen) + "</h3> pollen"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return hasUpgrade("al", 112) ? "(+" + format(player.bpl.pollenGain) + "/s)" : "(+" + format(player.bpl.pollenGain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["bar", "pollenBar"],
        ["blank", "25px"],
        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]],
        ["row", [["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 20]]],
        ["blank", "25px"],
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "You have " + format(player.bpl.roles.drone.amount) + " Drone Bees."}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["row", [
                        ["raw-html", () => { return "Which boosts bees per second by x" + format(player.bpl.roles.drone.effect)}, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => {return player.bpl.roles.drone.amount.gte(1e100) ? "[SOFTCAPPED<sup>2</sup>]" : player.bpl.roles.drone.amount.gte(1e60) ? "[SOFTCAPPED]" : ""}, {color: "#c00", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                    ]],
                ], {width: "525px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "white"}],
                ["clickable", 11],
            ], {borderBottom: "4px solid white"}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => {return "You have " + format(player.bpl.roles.worker.amount) + " Worker Bees."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", () => {return "Which boosts pollen gain by x" + format(player.bpl.roles.worker.effect)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.bpl.roles.worker.amount.gte(1e30) ? "[SOFTCAPPED]" : ""}, {color: "#c00", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                    ]],
                ], {width: "525px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "white"}],
                ["clickable", 12],
            ], () => { return hasUpgrade("bpl", 13) ? {borderBottom: "4px solid white"} : {display: "none !important"} }],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "You have " + format(player.bpl.roles.queen.amount) + " Queen Bees."}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "Which improves pollen conversion rate by x" + format(player.bpl.roles.queen.effect)}, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                ], {width: "525px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "white"}],
                ["clickable", 13],
            ], () => { return hasUpgrade("bpl", 16) ? {borderBottom: "4px solid white"} : {display: "none !important"} }],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "You have " + format(player.bpl.roles.empress.amount) + " Empress Bees."}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "Which boosts flower gain by x" + format(player.bpl.roles.empress.effect)}, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                ], {width: "525px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "white"}],
                ["clickable", 14],
            ], () => { return hasUpgrade("al", 120) ? {borderBottom: "4px solid white"} : {display: "none !important"} }],
        ], {userSelect: "none", backgroundColor: "#332a1f", borderLeft: "4px solid white", borderRight: "4px solid white", borderTop: "4px solid white"}],
    ],
    layerShown() { return player.startedGame && (player.bee.totalResearch.gte(25) && player.bee.path != 2) || (player.tad.hiveExpand && player.bee.totalResearch.gte(120) && player.bee.path == 2)}
})
