addLayer("tas", {
    name: "Tasks",
    symbol: "TS",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        
        tasks: {
            1: {
                time: new Decimal(20),
                maxTime() {
                    let amt = new Decimal(30)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            2: {
                time: new Decimal(60),
                maxTime() {
                    let amt = new Decimal(120)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#4d3366",
            //background: "linear-gradient(135deg, #ffffff 0%, #bf7fff 100%)",
            background: "#e9a8ff",
            "background-origin": "border-box",
            "border-color": "#4d3366",
        };
    },
    tooltip: "Tasks",
    color: "#ffffdf",
    update(delta) {
        for (let i = 0; i < Object.keys(player.tas.tasks).length; i++) {
            player.tas.tasks[i+1].time = player.tas.tasks[i+1].time.add(delta)
            if (player.tas.tasks[i+1].canAddCompletion && player.tas.tasks[i+1].time.gte(player.tas.tasks[i+1].maxTime())) {
                player.tas.tasks[i+1].completions = player.tas.tasks[i+1].completions.add(1)
                player.tas.tasks[i+1].canAddCompletion = false
            }
        }
    },
    branches: ["bum", "ans"],
    clickables: {
        1: {
            title() { return "<h3>Use</h3>" },
            canClick() { return player.tas.tasks[1].time.gte(player.tas.tasks[1].maxTime())},
            unlocked() { return true },
            onClick() {
                player.tas.tasks[1].time = new Decimal(0)
                player.tas.tasks[1].canAddCompletion = true
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#e9a8ff"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Use</h3>" },
            canClick() { return player.tas.tasks[2].time.gte(player.tas.tasks[2].maxTime())},
            unlocked() { return true },
            onClick() {
                player.tas.tasks[2].time = new Decimal(0)
                player.tas.tasks[2].canAddCompletion = true
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#e9a8ff"
                } else {
                    look.background = "#bf8f8f"
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
            "Tasks": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", player.tas.tasks[1].time.gte(player.tas.tasks[1].maxTime()) ? "0%" : formatShortestWhole(player.tas.tasks[1].time.div(player.tas.tasks[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#864d99", border: "3px solid #4d3366", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.tas.tasks[1].time.lt(player.tas.tasks[1].maxTime()) ?
                                "conic-gradient(#ffffdf " + (player.tas.tasks[1].time.div(player.tas.tasks[1].maxTime())).min(1).max(0) * 360 + "deg, #140b17 0deg)" : "#140b17"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Boost α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.tas.tasks[1].time.lt(player.tas.tasks[1].maxTime()) ? formatTime(player.tas.tasks[1].maxTime().sub(player.tas.tasks[1].time)) : formatTime(player.tas.tasks[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", "Level " + formatShortestWhole(player.tas.tasks[1].completions), {color: "#e9a8ff", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+x0.2 Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + format(player.tas.tasks[1].completions.mul(0.2).add(1)) + ")", {color: "#e9a8ff", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#864d99", borderRadius: "5px 5px 0px 0px", width: "150px", height:"45px"}],
                            ["blank", "3px"],
                            ["clickable", 1]
                        ], {background: "#4d3366",border: "3px solid #4d3366", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                        ]],
                    ["blank", "25px"]]
                    if (hasUpgrade('wel', 13)) {
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", player.tas.tasks[2].time.gte(player.tas.tasks[2].maxTime()) ? "0%" : formatShortestWhole(player.tas.tasks[2].time.div(player.tas.tasks[2].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#864d99", border: "3px solid #4d3366", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.tas.tasks[2].time.lt(player.tas.tasks[2].maxTime()) ?
                                "conic-gradient(#ffffdf " + (player.tas.tasks[2].time.div(player.tas.tasks[2].maxTime())).min(1).max(0) * 360 + "deg, #140b17 0deg)" : "#140b17"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Boost β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.tas.tasks[2].time.lt(player.tas.tasks[2].maxTime()) ? formatTime(player.tas.tasks[2].maxTime().sub(player.tas.tasks[2].time)) : formatTime(player.tas.tasks[2].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", "Level " + formatShortestWhole(player.tas.tasks[2].completions), {color: "#e9a8ff", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+x1 Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + format(player.tas.tasks[2].completions.add(1)) + ")", {color: "#e9a8ff", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#864d99", borderRadius: "5px 5px 0px 0px", width: "150px", height:"45px"}],
                            ["blank", "3px"],
                            ["clickable", 2]
                        ], {background: "#4d3366",border: "3px solid #4d3366", borderRadius: "103px 103px 8px 8px", width: "150px"}],)
                    }
                    return look
                },
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("wel", 11)}
})