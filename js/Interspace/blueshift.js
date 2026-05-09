addLayer("blu", {
    name: "Blueshift",
    symbol: "BL",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        totalBlueshifts: new Decimal(0),
        blueshifts: {
            1: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(10),
            },
            2: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(30),
            },
            3: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(120),
            },
            4: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(600),
            },
            5: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(10),
            },
            6: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(20),
            },
            7: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(60),
            },
            8: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleAddedSpeedDiv: new Decimal(1),
                shiftBase: new Decimal(240),
            },
        },
        blueshiftEffectBase: new Decimal(0),
        blueshiftEffect: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#303080",
            background: "linear-gradient(45deg, #a1a1ff 50%, #b58cde 100%)",
            "background-origin": "border-box",
            "border-color": "#303080",
        };
    },
    tooltip: "Blueshift",
    color: "#ffffd1",
    update(delta) {
        player.blu.blueshiftEffectBase = new Decimal(3)
        player.blu.blueshiftEffect = player.blu.totalBlueshifts.pow_base(player.blu.blueshiftEffectBase)

        // BLUESHIFTS
        
        player.blu.blueshifts[1].cycleGainMul = player.blu.blueshifts[1].amount.pow_base(10)
        player.blu.blueshifts[1].cycleAddedSpeedDiv = player.blu.blueshifts[1].amount.pow_base(10)
        
        player.blu.blueshifts[2].cycleGainMul = player.blu.blueshifts[2].amount.pow_base(30)
        player.blu.blueshifts[2].cycleAddedSpeedDiv = player.blu.blueshifts[2].amount.pow_base(30)
        
        player.blu.blueshifts[3].cycleGainMul = player.blu.blueshifts[3].amount.pow_base(120)
        player.blu.blueshifts[3].cycleAddedSpeedDiv = player.blu.blueshifts[3].amount.pow_base(120)
        
        player.blu.blueshifts[4].cycleGainMul = player.blu.blueshifts[4].amount.pow_base(600)
        player.blu.blueshifts[4].cycleAddedSpeedDiv = player.blu.blueshifts[4].amount.pow_base(600)
        
        player.blu.blueshifts[5].cycleGainMul = player.blu.blueshifts[5].amount.pow_base(5)
        player.blu.blueshifts[5].cycleAddedSpeedDiv = player.blu.blueshifts[5].amount.pow_base(5)
        
        player.blu.blueshifts[6].cycleGainMul = player.blu.blueshifts[6].amount.pow_base(10)
        player.blu.blueshifts[6].cycleAddedSpeedDiv = player.blu.blueshifts[6].amount.pow_base(10)
        
        player.blu.blueshifts[7].cycleGainMul = player.blu.blueshifts[7].amount.pow_base(30)
        player.blu.blueshifts[7].cycleAddedSpeedDiv = player.blu.blueshifts[7].amount.pow_base(30)
        
        player.blu.blueshifts[8].cycleGainMul = player.blu.blueshifts[8].amount.pow_base(120)
        player.blu.blueshifts[8].cycleAddedSpeedDiv = player.blu.blueshifts[8].amount.pow_base(120)

    },
    blueshiftReset(isRewarded, id) {
        prismReset(false)

    },
    branches: ["wel"],
    clickables: {
        1001: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[this.id-1000].maxTime.div(player.wel.modules[this.id-1000].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        1002: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[this.id-1000].maxTime.div(player.wel.modules[this.id-1000].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        1003: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[this.id-1000].maxTime.div(player.wel.modules[this.id-1000].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        1004: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[this.id-1000].maxTime.div(player.wel.modules[this.id-1000].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Blueshifts": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", 
                                    "<small>When a fountain's timer gets at or below 0.1s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as all light well cycles. Each blueshift done divides added cycle speed and increases cycle gain for its respective well. You also gain multipliers from total blueshifts done.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {background: "#2f2f80", border: "3px solid #4242b3", borderRadius: "10px", width: "600px", height: "125px", padding: "3px"}],                   
                        ], {background: "#2f2f80", borderRadius: "13px", padding: "3px", width: "612px"}],
                        ["blank", "25px"],
                        ["raw-html", "You have blueshifted " + formatWhole(player.blu.totalBlueshifts) + " times.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "<small>Boosts light well cycle gain by x" + format(player.blu.blueshiftEffect, 1) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],

                        ["style-row", [

                            // alpha
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", 1001],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[1].amount) + " α →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[1].cycleGainMul) + " α Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(/" + formatWhole(player.blu.blueshifts[1].cycleAddedSpeedDiv) + " Added α Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // beta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", 1003],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[2].amount) + " β →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(" + formatWhole(player.blu.blueshifts[2].cycleGainMul) + " β Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(/" + formatWhole(player.blu.blueshifts[2].cycleAddedSpeedDiv) + " Added β Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // gamma
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", 1004],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[3].amount) + " γ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[3].cycleGainMul) + " γ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(/" + formatWhole(player.blu.blueshifts[3].cycleAddedSpeedDiv) + " Added γ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // delta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well δ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", 1002],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[4].amount) + " δ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[4].cycleGainMul) + " δ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(/" + formatWhole(player.blu.blueshifts[4].cycleAddedSpeedDiv) + " Added δ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                        ]],
                        ["blank", "25px"],
                    ]
                }
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return []
                }
            }
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 301)}
})