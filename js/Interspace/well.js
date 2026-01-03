addLayer("wel", {
    name: "Well of Light",
    symbol: "WE",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,

        light: new Decimal(0),
        lightMult: new Decimal(1),
        lightEffect: new Decimal(0),
        lightModuleEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        
        modules: {
            1: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(10)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                allowedCompletionsRemaining: new Decimal(0),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            2: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(60)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                allowedCompletionsRemaining: new Decimal(0),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            3: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(3)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                allowedCompletionsRemaining: new Decimal(0),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#336659",
            background: "#a8ffd3",
            "background-origin": "border-box",
            "border-color": "#336659",
        };
    },
    tooltip: "Well of Light",
    color: "#ffdfdf",
    update(delta) {
        player.wel.lightMult = new Decimal(1)
        
        player.wel.lightMult = player.wel.lightMult.mul(player.tas.tasks[1].completions.mul(0.2).add(1))
        player.wel.lightMult = player.wel.lightMult.mul(player.tas.tasks[2].completions.add(1))

        if (hasUpgrade("wel", 14)) player.wel.lightMult = player.wel.lightMult.mul(upgradeEffect("wel", 14))

        for (let i = 0; i < Object.keys(player.wel.modules).length; i++) {
            player.wel.modules[i+1].time = player.wel.modules[i+1].time.add(delta)
        }

        player.wel.lightEffect = player.wel.light.add(1).pow(0.1)
    },
    branches: ["tas", "bum", ["cer", "#fff", 40], ["cer", "#402030", 8]],
    bars: {},
    upgrades: {
        11: {
            title: "Light I",
            unlocked() { return true },
            description() {return "Unlock bonuses."},
            cost: new Decimal(5),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Light II",
            unlocked() { return hasUpgrade("wel", 11) },
            description() {return "Unlock light module β."},
            cost: new Decimal(15),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Light III",
            unlocked() { return hasUpgrade("wel", 11) },
            description() {return "Unlock light bonus β."},
            cost: new Decimal(75),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Light IV.",
            unlocked() { return hasUpgrade("wel", 13) },
            description() {return "Light boosts itself."},
            cost: new Decimal(500),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            effect() { return player.wel.light.add(1).pow(0.125) },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))},
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Light V.",
            unlocked() { return hasUpgrade("wel", 13) },
            description() {return "Unlock light module γ."},
            cost: new Decimal(2e3),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Light VI",
            unlocked() { return hasUpgrade("wel", 15) },
            description() {return "..."},
            cost: new Decimal(5e3),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            effect() { return player.cof.coreFragments[3].pow(0.15).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    clickables: {
        1: {
            title() { return "<h3>Collect</h3>" },
            canClick() { return player.wel.modules[1].time.gte(player.wel.modules[1].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[1].lightGain())
                player.wel.modules[1].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Collect</h3>" },
            canClick() { return player.wel.modules[2].time.gte(player.wel.modules[2].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[2].lightGain())
                player.wel.modules[2].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(5)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Collect</h3>" },
            canClick() { return player.wel.modules[3].time.gte(player.wel.modules[3].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[3].lightGain())
                player.wel.modules[3].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(0.25)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
    },
    microtabs: {
        stuff: {
            "Modules": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[1].time.div(player.wel.modules[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[1].time.lt(player.wel.modules[1].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[1].time.div(player.wel.modules[1].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Module α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[1].time.lt(player.wel.modules[1].maxTime()) ? formatTime(player.wel.modules[1].maxTime().sub(player.wel.modules[1].time)) : formatTime(player.wel.modules[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[1].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 1]
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                        ]],
                    ["blank", "25px"]]
                    if (hasUpgrade('wel', 12)) {
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[2].time.div(player.wel.modules[2].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[2].time.lt(player.wel.modules[2].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[2].time.div(player.wel.modules[2].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Module β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[2].time.lt(player.wel.modules[2].maxTime()) ? formatTime(player.wel.modules[2].maxTime().sub(player.wel.modules[2].time)) : formatTime(player.wel.modules[2].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[2].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 2]
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    )
                    }
                    if (hasUpgrade('wel', 15)) {
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[3].time.div(player.wel.modules[3].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[3].time.lt(player.wel.modules[3].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[3].time.div(player.wel.modules[3].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Module γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[3].time.lt(player.wel.modules[3].maxTime()) ? formatTime(player.wel.modules[3].maxTime().sub(player.wel.modules[3].time)) : formatTime(player.wel.modules[3].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 3]
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    )
                    }
                    return look
                },
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], 
                        ]],
                        ["row", [
                            ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25],
                        ]],
                        ["row", [
                            ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],
                        ]],
                        ["row", [
                            ["upgrade", 41], ["upgrade", 42], ["upgrade", 43],
                        ]],
                        ["row", [
                            ["upgrade", 51], ["upgrade", 52],
                        ]],
                        ["row", [
                            ["upgrade", 61],
                        ]],
                    ]
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        //["raw-html", () => { return "Boosts dark celestial points by x" + format(player.wel.lightEffect) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    playerhown() { return player.startedGame == true}
})