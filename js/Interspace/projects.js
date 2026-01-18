addLayer("prj", {
    name: "Projects",
    symbol: "PJ",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        storedTimeCapsules: new Decimal(0),

        totalProjectLevels: new Decimal(0),
        projectSpeed: new Decimal(1),
        
        modules: {
            1: {
                time: new Decimal(0),
                maxTime() {
                    return new Decimal(120).mul(player.prj.modules[1].completions.add(1).pow(2)).mul(Decimal.pow(1.5, player.prj.modules[1].completions))
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
            color: "#663366",
            background: "#dfffdf",
            "background-origin": "border-box",
            "border-color": "#663366",
        };
    },
    tooltip: "Projects",
    color: "#dfffdf",
    update(delta) {
        player.prj.totalProjectLevels = player.prj.modules[1].completions
    },
    branches: ["ans"],
    clickables: {
        1: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.wel.modules[1].time.gte(player.wel.modules[this.id].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(1)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffa8d3"
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
            "Projects": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    // #663366
                    // #994d86
                    // #ffa8d3
                    // #dfffdf
                    let look = [
                        ["blank", "25px"],
                        ["raw-html", "You have <h3>" + format(player.prj.projectSpeed) + "</h3> stored time capsules. (From Dark Universe Eclipse)", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", "You are gaining <h3>" + format(player.prj.projectSpeed) + "</h3> project progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "You are focusing on 0/1 projects.", {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["row", [
                            ["style-column", [
                                ["style-row", [
                                    ["style-column", [
                                        ["blank", "10px"],
                                        ["raw-html", "Time Energy", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", player.prj.modules[1].time.lt(player.prj.modules[1].maxTime()) ? formatTime(player.prj.modules[1].maxTime().sub(player.prj.modules[1].time)) : formatTime(player.prj.modules[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", "<small>(20.0/120.0)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ["blank", "10px"],
                                        ["style-column", [
                                            ["raw-html", "-1 Stored TC", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {background: "#994d86", borderRadius: "5px 5px 0px 0px", width: "238px", height:"25px"}],
                                        ["blank", "3px"],
                                        ["clickable", 1],
                                    ], {background: "#663366", border: "3px solid #663366", borderRadius: "8px 0px 0px 0px", width: "238px", height: "150px"}],
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", player.prj.modules[1].time.gte(player.prj.modules[1].maxTime()) ? "0%" : formatShortestWhole(player.prj.modules[1].time.div(player.prj.modules[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#994d86", border: "3px solid #663366", borderRadius: "100px", width: "75px", height:"75px"}]
                                            ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #663366", margin: "-3px", marginTop: "75px",
                                                background: player.prj.modules[1].time.lt(player.prj.modules[1].maxTime()) ?
                                                "conic-gradient(#dfffdf " + (player.prj.modules[1].time.div(player.prj.modules[1].maxTime())).min(1).max(0) * 360 + "deg, #1a001a 0deg)" : "#1a001a"
                                            }],
                                        ], {background: "#663366", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                                        ["style-column", [], {background: "#994d86", height: "78px"}],
                                    ], {border: "3px solid #663366", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "153px"}],
                                ], {verticalAlign: "bottom"}],
                                ["style-row", [
                                    ["style-column", [
                                        ["raw-html", formatWhole(player.prj.modules[1]) + " ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "75px"}],
                                    ["style-column", [], {width: "3px", height: "46px"}],
                                    ["style-column", [
                                        ["raw-html", "<small>(x" + format(player.prj.totalProjectLevels.pow(1.5).add(1)) + " Time Energy)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "292px", marginRight: "14px"}],
                                ], {background: "#994d86", border: "3px solid #663366", borderTop: "0px", height: "25px"}],
                                ["style-column", [
                                    ["always-scroll-column", [
                                        ["style-row", [
                                            ["style-column", [
                                                ["raw-html", "1 ↻", {color: "black", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "75px", height: "46px"}],
                                            ["style-column", [], {background: "#485e48", width: "3px", height: "46px"}],
                                            ["style-column", [
                                                ["raw-html", "<small>Unlock Time Energy.</small>", {color: "black", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "292px", height: "46px"}],
                                        ], {background: "#efffef", border: "3px solid #485e48", width: "373px", height: "46px", marginRight: "9px"}],
                                        ["style-row", [
                                            ["style-column", [
                                                ["raw-html", "2 ↻", {color: "#efffef", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "75px", height: "46px"}],
                                            ["style-column", [], {background: "#485e48", width: "3px", height: "46px"}],
                                            ["style-column", [
                                                ["raw-html", "<small>Double normality and clouds per total project level. (x" + format(Decimal.pow(2, player.prj.totalProjectLevels)) + ")</small>", {color: "#efffef", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "292px", height: "46px"}],
                                        ], {background: "#232e23", border: "3px solid #485e48", borderTop: "0px", width: "373px", height: "46px", marginRight: "9px"}],
                                        ["style-row", [
                                            ["style-column", [
                                                ["raw-html", "3 ↻", {color: "#efffef", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "75px", height: "46px"}],
                                            ["style-column", [], {background: "#485e48", width: "3px", height: "46px"}],
                                            ["style-column", [
                                                ["raw-html", "<small>Project progress gain reduces well timers. (/" + format(player.prj.projectSpeed.log(10).add(1).pow(0.5)) + ")</small>", {color: "#efffef", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "292px", height: "46px"}],
                                        ], {background: "#232e23", border: "3px solid #485e48", borderTop: "0px", width: "373px", height: "46px", marginRight: "9px"}],
                                    ], {width: "394px", height: "150px"}],
                                ], {background: "#1a001a", border: "3px solid #663366", borderTop: "0px", height: "150px"}],
                            ], {width: "400px"}],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", "<h2>Reactor<h2><br><h3>Req: 6.66e666 SP and 666,666 Prisms</h3>", {color: "#efffef", fontSize: "10px"}],
                            ], {background: "#232e23", border: "3px solid #485e48", borderRadius: "8px 81px 0px 0px", width: "400px", height: "331px"}]
                        ]],
                    ["blank", "25px"]]
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && true}
})