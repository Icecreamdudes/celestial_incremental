addLayer("lightRift", {
    name: "Light Rift",
    symbol: "LR",
    universe: "U3",
    row: 4,
    position: 0,
    startData() { return {
        unlocked: true,

        interspaceUnlocked: false,
        interspaceConditions: [false, false, false, false],
        interspaceConditionsMet: 0,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#1a6641",
            background: "linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)",
            "background-origin": "border-box",
            "border-color": "#1a6641",
        };
    },
    tooltip: "Light Rift",
    color: "#ffdfef",
    update(delta) {
        player.lightRift.interspaceConditionsMet = 0
        player.lightRift.interspaceConditions.forEach((v) => (v === true && player.lightRift.interspaceConditionsMet++));
    },
    branches: [],
    clickables: {
        101: {
            title() { return "<h3>" + (player.lightRift.interspaceConditions[0] ? "<h3>THE" : "<h3>DEPOSIT SPACE ENERGY") },
            canClick() { return player.sb.storedSpaceEnergy.gte(1e24) && !player.lightRift.interspaceConditions[0] },
            unlocked() { return true },
            onClick() {
                player.lightRift.interspaceConditions[0] = true
            },
            style() {
                let look = {width: "250px", minHeight: "50px", borderRadius: "0px"}
                if (player.lightRift.interspaceConditions[0]) {
                    look.backgroundColor = "#00000000"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                }
                else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        102: {
            title() { return "<h3>" + (player.lightRift.interspaceConditions[1] ? "<h3>CYCLE" : "<h3>DEPOSIT SINGULARITIES") },
            canClick() { return player.s.singularities.gte(1e9) && !player.lightRift.interspaceConditions[1] },
            unlocked() { return true },
            onClick() {
                player.lightRift.interspaceConditions[1] = true
            },
            style() {
                let look = {width: "250px", minHeight: "50px", borderRadius: "0px"}
                if (player.lightRift.interspaceConditions[1]) {
                    look.backgroundColor = "#00000000"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                }
                else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        103: {
            title() { return "<h3>" + (player.lightRift.interspaceConditions[2] ? "<h3>MUST" : "<h3>DEPOSIT STARS") },
            canClick() { return player.au2.stars.gte(1e40) && !player.lightRift.interspaceConditions[2] },
            unlocked() { return true },
            onClick() {
                player.lightRift.interspaceConditions[2] = true
            },
            style() {
                let look = {width: "250px", minHeight: "50px", borderRadius: "0px"}
                if (player.lightRift.interspaceConditions[2]) {
                    look.backgroundColor = "#00000000"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                }
                else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        104: {
            title() { return "<h3>" + (player.lightRift.interspaceConditions[3] ? "<h3>BREAK" : "<h3>DEPOSIT CORE FRAGMENTS") },
            canClick() { return player.cof.coreFragments[2].gte(1e10) && !player.lightRift.interspaceConditions[3] },
            unlocked() { return true },
            onClick() {
                player.lightRift.interspaceConditions[3] = true
            },
            style() {
                let look = {width: "250px", minHeight: "50px", borderRadius: "0px"}
                if (player.lightRift.interspaceConditions[3]) {
                    look.backgroundColor = "#00000000"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                }
                else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        105: {
            title() { return "<h3>UNLOCK ???" },
            canClick() { return player.lightRift.interspaceConditions[0] == true && player.lightRift.interspaceConditions[1] == true && player.lightRift.interspaceConditions[2] == true && player.lightRift.interspaceConditions[3] == true },
            unlocked() { return true },
            onClick() {
                player.lightRift.interspaceUnlocked = true
                player.tab = "wel"
                player.universe = "UD"
                //player.subtabs["wel"]['stuff'] = 'Upgrades'

                if (!hasAchievement("achievements", 1201)) completeAchievement("achievements", 1201);
            },
            style() {
                let look = {width: "527px", minHeight: "50px", borderRadius: "0px 0px 16px 16px"}
                if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.color = "black"
                    look.border = "3px solid #1a66417f"
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
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {background:"linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)" , color: "#1a6641", border: "2px solid #1a6641", borderRadius: "5px" } },
                unlocked() { return player.zarDungeon.zarDefeated && !player.lightRift.interspaceUnlocked},
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["raw-html", "α", {color: "#1a6641", fontSize: "125px", fontFamily: "monospace"}],
                                ["style-row", [
                                    ["raw-html", () => {return format(player.sb.storedSpaceEnergy) + " / 1e24<br>Stored Space Energy"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#1a6641", borderRadius: "10px 10px 0px 0px", width: "250px", height:"50px"}],
                                ["blank", "3px", {width: "3px"}],
                                ["clickable", 101],
                            ], {width: "256px", height: "256px", background:"linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)", border: "3px solid #1a6641", borderRadius: "16px 0px 0px 0px"}],
                        ["blank", "3px", {width: "3px"}],
                            ["style-column", [
                                ["raw-html", "β", {color: "#1a6641", fontSize: "125px", fontFamily: "monospace"}],
                                ["style-row", [
                                    ["raw-html", () => {return format(player.s.singularities) + " / 1e9<br>Singularities"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#1a6641", borderRadius: "10px 10px 0px 0px", width: "250px", height:"50px"}],
                                ["blank", "3px", {width: "3px"}],
                                ["clickable", 102],
                            ], {width: "256px", height: "256px", background:"linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)", border: "3px solid #1a6641", borderRadius: "0px 16px 0px 0px"}],
                        ]],
                        ["blank", "3px", {width: "3px"}],
                        ["style-row", [
                            ["style-column", [
                                ["raw-html", "γ", {color: "#1a6641", fontSize: "125px", fontFamily: "monospace"}],
                                ["style-row", [
                                    ["raw-html", () => {return format(player.au2.stars) + " / 1e40<br>Stars"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#1a6641", borderRadius: "10px 10px 0px 0px", width: "250px", height:"50px"}],
                                ["blank", "3px", {width: "3px"}],
                                ["clickable", 103],
                            ], {width: "256px", height: "256px", background:"linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)", border: "3px solid #1a6641", borderRadius: "0px"}],
                        ["blank", "3px", {width: "3px"}],
                            ["style-column", [
                                ["raw-html", "δ", {color: "#1a6641", fontSize: "125px", fontFamily: "monospace"}],
                                ["style-row", [
                                    ["raw-html", () => {return format(player.cof.coreFragments[2]) + " / 1e10<br>Technological Core Fragments"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#1a6641", borderRadius: "10px 10px 0px 0px", width: "250px", height:"50px"}],
                                ["blank", "3px", {width: "3px"}],
                                ["clickable", 104],
                            ], {width: "256px", height: "256px", background:"linear-gradient(135deg, #dfffdf 0%, #ffa1ff 100%)", border: "3px solid #1a6641", borderRadius: "0px"}],
                        ]],
                        ["blank", "3px", {width: "3px"}],
                        ["clickable", 105],
                    ], {background: "#dfffdf 0%", border: "3px solid #1a6641", borderRadius: "21px", padding: "3px"}],
                ]
            },
        }
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.zarDungeon.zarDefeated && !player.lightRift.interspaceUnlocked}
})