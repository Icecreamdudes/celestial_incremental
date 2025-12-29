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
                    return new Decimal(120)
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
            color: "#003f3f",
            background: "#4d9973",
            "background-origin": "border-box",
            "border-color": "#003f3f",
        };
    },
    tooltip: "Well of Light",
    color: "#ffdfdf",
    update(delta) {
        player.wel.lightMult = new Decimal(1)
        for (let i = 0; i < Object.keys(player.wel.tasks).length; i++) {
            player.wel.tasks[i+1].time = player.wel.tasks[i+1].time.add(delta)
        }
        player.wel.lightEffect = player.wel.light.add(1).pow(0.1)
    },
    branches: ["tas", "bum", ["cer", "#fff", 40], ["cer", "#402030", 8]],
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
    clickables: {
        1: {
            title() { return "<h3>Collect</h3>" },
            canClick() { return player.wel.tasks[1].time.gte(player.wel.tasks[1].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[1].lightGain())
                player.wel.tasks[1].time = new Decimal(0)
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
            canClick() { return player.wel.tasks[2].time.gte(player.wel.tasks[2].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[2].lightGain())
                player.wel.tasks[2].time = new Decimal(0)
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
    },
    microtabs: {
        stuff: {
            "Light Modules": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.tasks[1].time.div(player.wel.tasks[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], () => {
                                let look = {borderRadius: "50%", width: "150px", height:"150px"}
                                player.wel.tasks[1].time.lt(player.wel.tasks[1].maxTime()) ?
                                look.background = "conic-gradient(#ffdfdf " + (player.wel.tasks[1].time.div(player.wel.tasks[1].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)"
                                : look.background = "#a8ffd3"
                                return look
                            }],
                            ["blank", "9px"],
                            ["raw-html", "Light Module α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.tasks[1].time.lt(player.wel.tasks[1].maxTime()) ? formatTime(player.wel.tasks[1].maxTime().sub(player.wel.tasks[1].time)) : formatTime(player.wel.tasks[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[1].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 1]
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                        ["blank", "1px"],
                        ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.tasks[2].time.div(player.wel.tasks[2].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                            ], () => {
                                let look = {borderRadius: "50%", width: "150px", height:"150px"}
                                player.wel.tasks[2].time.lt(player.wel.tasks[2].maxTime()) ?
                                look.background = "conic-gradient(#ffdfdf " + (player.wel.tasks[2].time.div(player.wel.tasks[2].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)"
                                : look.background = "#a8ffd3"
                                return look
                            }],
                            ["blank", "9px"],
                            ["raw-html", "Light Module β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.tasks[2].time.lt(player.wel.tasks[2].maxTime()) ? formatTime(player.wel.tasks[2].maxTime().sub(player.wel.tasks[2].time)) : formatTime(player.wel.tasks[2].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[2].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 2]
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                        ]],
                    ["blank", "25px"]]
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Boosts dark celestial points by x" + format(player.wel.lightEffect) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    playerhown() { return player.startedGame == true}
})