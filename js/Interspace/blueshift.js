addLayer("blu", {
    name: "Blueshift",
    symbol: "BL",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        totalBlueshifts: new Decimal(0),
        blueshifts: {
            1: new Decimal(0),
            2: new Decimal(0),
            3: new Decimal(0),
            4: new Decimal(0),
        },
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
    },
    blueshiftReset(isRewarded, id) {
        prismReset(false)

    },
    branches: ["wel"],
    clickables: {
        1001: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.light.gte(1e15)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
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
            "Blueshift": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", 
                                    "<small>When a fountain's timer gets below 0.2s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as all light well cycles. Each blueshift done roots cycle speed and increases cycle gain for its respective well. You also gain multipliers from total blueshifts done.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {background: "#2f2f80", border: "3px solid #4242b3", borderRadius: "10px", width: "600px", height: "125px", padding: "3px"}],                   
                        ], {background: "#2f2f80", borderRadius: "13px", padding: "3px", width: "612px"}],
                        ["blank", "25px"],
                        ["raw-html", "You have blueshifted " + formatWhole(player.blu.totalBlueshifts) + " times.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "<small>Boosts prismatic gain by x1.</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["style-row", [
                            ["style-column", [
                                ["blank", "9px"],
                                ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "<small>(0.67/0.2s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                    ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["clickable", 1001],
                            ]],
                        ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],
                        ["blank", "9px"],
                        ["raw-html", "1 α →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "(x100 α ↻)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                        ["raw-html", "(2√ α ↻ Spd)", {color: "#ff7f00", fontSize: "12px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                    ]
                }
            },
            "Milestones": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 301)}
})