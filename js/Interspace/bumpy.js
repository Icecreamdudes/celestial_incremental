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

        /* Projects:

        Pre-Cere Stage 1:
            Reactor (Layer in 3)
            Time Capsules (Layer in D1 during Eclipse)
            Development Experience (Layer in Delta)
            Well Creature (Epic Pet)

        Post-Cere Stage 1:
            Anti-Singularity (Layer in 3)
            Torment (Legendary Punchcard during Eclipse)
            Relics (Layer in Delta)
            Starlight (Layer in A2)

        Defeating Cere unlocks the _ meta-progression feature.
        */
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#dfffdf",
            background: "#663366",
            "background-origin": "border-box",
            "border-color": "#dfffdf",
        };
    },
    tooltip: "Bumpy",
    color: "#dfffdf",
    update(delta) {
        player.bum.starlightToGet = player.wel.light.div(5e3).pow(0.125)

        for (let i = 0; i < Object.keys(player.bum.tasks).length; i++) {
            player.bum.tasks[i+1].time = player.bum.tasks[i+1].time.add(delta)
            if (player.bum.tasks[i+1].canAddCompletion && player.bum.tasks[i+1].time.gte(player.bum.tasks[i+1].maxTime())) {
                player.bum.tasks[i+1].completions = player.bum.tasks[i+1].completions.add(1)
                player.bum.tasks[i+1].canAddCompletion = false
            }
        }
    },
    branches: ["dxp"],
    clickables: {
        11: {
            title() { return "<h2>Gain starlight, but reset previous content.</h2><br><h3><small>Req: 5,000 Light</small></h3>" },
            canClick() { return player.wel.light.gte(5e3)},
            unlocked() { return true },
            onClick() {
                player.bum.starlight = player.bum.starlight.add(player.bum.starlightToGet)
                player.wel.light = new Decimal(0)

                player.wel.tasks[1].time = new Decimal(0)
                player.wel.tasks[2].time = new Decimal(0)
                player.wel.tasks[3].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "8px", color: "#dfffdf", borderColor: "#dfffdf"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #180b18 0%, #dfffdf 400%)"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "Starlight I",
            unlocked() { return true },
            description() {return "Halve the cooldown of light modules."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Starlight II",
            unlocked() { return true },
            description() {return "Halve the cooldown of light tasks."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Starlight III",
            unlocked() { return true },
            description() {return "Light modules can gain one extra charge."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Starlight IV",
            unlocked() { return true },
            description() {return "Light tasks can gain one extra charge."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Starlight V",
            unlocked() { return true },
            description() {return "Double light."},
            cost: new Decimal(2),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
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
                    return [
                        ["blank", "25px"],
                        ["clickable", 11],
                        ["blank", "25px"],
                        ["row", [
                        ["row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], 
                        ]],
                        ]]
                    ]
                }
            },
            "Projects": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", player.bum.tasks[1].time.gte(player.bum.tasks[1].maxTime()) ? "0%" : formatShortestWhole(player.bum.tasks[1].time.div(player.bum.tasks[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#994d86", border: "3px solid #663366", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.bum.tasks[1].time.lt(player.bum.tasks[1].maxTime()) ?
                                "conic-gradient(#dfffdf " + (player.bum.tasks[1].time.div(player.bum.tasks[1].maxTime())).min(1).max(0) * 360 + "deg, #180b18 0deg)" : "#180b18"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Generator", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.bum.tasks[1].time.lt(player.bum.tasks[1].maxTime()) ? formatTime(player.bum.tasks[1].maxTime().sub(player.bum.tasks[1].time)) : formatTime(player.bum.tasks[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", "Level " + formatShortestWhole(player.bum.tasks[1].completions), {color: "#ffa8d3", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+1% LMα Gain /s", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(+" + formatWhole(player.bum.tasks[1].completions.mul(0.2).add(1)) + "%/s)", {color: "#ffa8d3", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#994d86", borderRadius: "5px 5px 0px 0px", width: "375px", height:"45px"}],
                            ["blank", "3px"],
                            ["clickable", 1]
                        ], {background: "#663366", border: "3px solid #663366", borderRadius: "103px 103px 8px 8px", width: "375px"}],
                        ]],
                    ["blank", "25px"]]
                    return look
                },
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.bum.starlight) + "</h3> starlight." }, {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bum.starlightToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.bum.starlightToGet.gt(1)) {look.color = "#dfffdf"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("wel", 16)}
})