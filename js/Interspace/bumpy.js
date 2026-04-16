addLayer("bum", {
    name: "Bumpy",
    symbol: "BU",
    universe: "UD",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,

        starlight: new Decimal(0),
        starlightToGet: new Decimal(0),
        
        tasks: {
            1: {
                time: new Decimal(20),
                maxTime() {
                    return new Decimal(60)
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
            color: "#dfffdf",
            background: "#401d40",
            "background-origin": "border-box",
            "border-color": "#dfffdf",
        };
    },
    tooltip: "Bumpy",
    color: "#dfffdf",
    update(delta) {
        player.bum.starlightToGet = player.wel.light.add(1).div(1e50).log(10).pow_base(1.25).floor()

        for (let i = 0; i < Object.keys(player.bum.tasks).length; i++) {
            player.bum.tasks[i+1].time = player.bum.tasks[i+1].time.add(delta)
            if (player.bum.tasks[i+1].canAddCompletion && player.bum.tasks[i+1].time.gte(player.bum.tasks[i+1].maxTime())) {
                player.bum.tasks[i+1].completions = player.bum.tasks[i+1].completions.add(1)
                player.bum.tasks[i+1].canAddCompletion = false
            }
        }
    },
    //branches: [["wel", "#fff", 40], ["wel", "#402030", 8]],
    branches: ["prj"],
    clickables: {
        1: {
            title() { return "<h2>Focus your light into starlight.</h2><br>Req: 1e50 Light" },
            canClick() { return player.wel.light.gte(1e50)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "2px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                return look
            },
        },
        11: {
            title() { return "<h2>BU</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        12: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        13: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        14: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
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
            "Starlight": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["clickable", 1],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
            "Journal": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-row", [
                            ["style-row", [
                                ["clickable", 11],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 12],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 13],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 14],
                            ] ,{width: "400px"}],
                            ["style-row", [

                            ] ,{width: "6px"}],
                            ["style-row", [

                            ] ,{width: "400px"}],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "4px 0 0 4px", margin: "3px"}],
                                ["top-column", [
                                    ["blank", "12px"],
                                    ["raw-html", 
                                    "Entry BU-01:"
                                    , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", 
                                    "Interspace</small>"
                                    , {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
                                    ["style-column", [
                                        ["raw-html",
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace", textAlign: "justify", display: "inline-flex"}],
                                    ], {margin: "12px"}],
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "0 4px 4px 0", margin: "3px"}],
                            ], {background: "#180b187f", borderRadius: "7px 7px 0 0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0 0 7px 7px"}],
                        ], {background: "#dfffdf", border: "3px solid #dfffdf", borderRadius: "10px"}],
                    ]
                    return look
                }
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.bum.starlight) + "</h3> starlight." }, {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.bum.starlightToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.bum.starlightToGet.gt(1)) {look.color = "#dfffdf"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && false || true}
})

/* REECE STATS

BHP.reece = {
    name() {return "Reece"},
    color: "#397363",
    icon() {return "resources/reece.png"},
    health() {return new Decimal(75)},
    damage() {return new Decimal(15)},
    defense() {return new Decimal(10)},
    regen() {return new Decimal(0)},
    agility() {return new Decimal(30)},
    luck() {return new Decimal(30)},
    mending: new Decimal(5),
}

*/

/* REECE SKILLS

*/