addLayer("tas", {
    name: "Tasks",
    symbol: "TS",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        
        tasks: {
            1: {
                time: new Decimal(0),
                maxTime() {
                    return new Decimal(10)
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            2: {
                time: new Decimal(0),
                maxTime() {
                    return new Decimal(20)
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#3f007f",
            background: "linear-gradient(135deg, #ffffff 0%, #bf7fff 100%)",
            "background-origin": "border-box",
            "border-color": "#3f007f",
        };
    },
    tooltip: "Tasks",
    color: "#ffffdf",
    update(delta) {
        for (let i = 0; i < Object.keys(player.tas.tasks).length; i++) {
            player.tas.tasks[i+1].time = player.tas.tasks[i+1].time.add(delta)
        }
    },
    branches: ["wel", "dxp"],
    clickables: {
        1: {
            title() { return "<h3>Use</h3>" },
            canClick() { return player.tas.tasks[1].time.gte(player.tas.tasks[1].maxTime())},
            unlocked() { return true },
            onClick() {
                player.tas.tasks[1].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.tas.lightMult
                return gain
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
            },
            lightGain() {
                let gain = player.tas.lightMult
                return gain
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
    upgrades: {
        /*11: {
            title: "CE-1",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) },
            description() {return "Boost cere points based on paradox core fragments.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(1e4),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return player.cof.coreFragments[3].pow(0.15).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },*/
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Tasks": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return formatShortestWhole(player.tas.tasks[1].time.div(player.tas.tasks[1].maxTime()).min(1).max(0).mul(100)) + "%" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#864d99", border: "3px solid #4d3366", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], () => {
                            let look = {borderRadius: "50%", width: "150px", height:"150px"}
                            player.tas.tasks[1].time.lt(player.tas.tasks[1].maxTime()) ?
                            look.background = "conic-gradient(#ffffdf " + (player.tas.tasks[1].time.div(player.tas.tasks[1].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)"
                            : look.background = "#e9a8ff"
                            return look
                        }],
                        ["blank", "9px"],
                        ["raw-html", () => { return "Light Boost α" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => { return player.tas.tasks[1].time.lt(player.tas.tasks[1].maxTime()) ? formatTime(player.tas.tasks[1].maxTime().sub(player.tas.tasks[1].time)) : formatTime(player.tas.tasks[1].maxTime()) + " CD"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "9px"],
                        ["style-column", [
                                ["raw-html", () => { return "+0.1 Base Light"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {background: "#864d99", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                        ["blank", "3px"],
                        ["clickable", 1]
                    ], {background: "#4d3366",border: "3px solid #4d3366", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ["blank", "1px"],
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return formatShortestWhole(player.tas.tasks[2].time.div(player.tas.tasks[2].maxTime()).min(1).max(0).mul(100)) + "%" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#864d99", border: "3px solid #4d3366", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], () => {
                            let look = {borderRadius: "50%", width: "150px", height:"150px"}
                            player.tas.tasks[2].time.lt(player.tas.tasks[2].maxTime()) ?
                            look.background = "conic-gradient(#ffffdf " + (player.tas.tasks[2].time.div(player.tas.tasks[2].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)"
                            : look.background = "#e9a8ff"
                            return look
                        }],
                        ["blank", "9px"],
                        ["raw-html", () => { return "Light Boost β" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => { return player.tas.tasks[2].time.lt(player.tas.tasks[2].maxTime()) ? formatTime(player.tas.tasks[2].maxTime().sub(player.tas.tasks[2].time)) : formatTime(player.tas.tasks[2].maxTime()) + " CD"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "9px"],
                        ["style-column", [
                                ["raw-html", () => { return "+x0.2 Light"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {background: "#864d99", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                        ["blank", "3px"],
                        ["clickable", 2]
                    ], {background: "#4d3366",border: "3px solid #4d3366", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ]],
                    ["blank", "25px"],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.tas.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true}
})