addLayer("pri", {
    name: "Prismatic",
    symbol: "PR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        prisms: new Decimal(0),
        bestPrisms: new Decimal(0),
        totalPrisms: new Decimal(0),
        prismsToGet: new Decimal(0),

        fountainSpeed: new Decimal(0),

        fountains: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                prismReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(1.2e3),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                prismReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(1.5e4),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                prismReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            4: {
                time: new Decimal(1e8),
                timeReq: new Decimal(1200),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                prismReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
        },

        blueshifts: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#335966",
            background: "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)",
            "background-origin": "border-box",
            "border-color": "#335966",
        };
    },
    tooltip: "Prismatic",
    color: "#d6ebff",
    update(delta) {
        player.pri.prismsToGet = player.wel.light.add(1).log(10).sub(15).pow_base(1.41421356237).floor()

        if (hasMilestone("pri", 203)) player.pri.prismsToGet = player.pri.prismsToGet.mul(2);

        if (player.pri.bestPrisms.lt(player.pri.prisms)) player.pri.bestPrisms = player.pri.prisms;
        
        player.pri.fountainSpeed = player.pri.totalPrisms.pow(2).div(10)

        // FOUNTAIN PROGRESS
        Object.keys(layers.pri.fountains).forEach(i => {
            let module = player.pri.fountains[i]
            let fountain = layers.pri.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.prismReq = fountain.getprismReq()
            module.completionEffect = fountain.getCompletionEffect()

            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
                if (module.time.gte(module.timeReq)) {
                    module.focused = false
                    module.completions = module.completions.add(1)
                    module.time = new Decimal(0)
                    player.prj.focused = player.prj.focused.sub(1)
                }
            }
        });
    },
    prismReset(isRewarded) {
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
            player.pri.totalPrisms = player.pri.totalPrisms.add(player.pri.prismsToGet)
        }

        player.wel.light = new Decimal(0)
        player.wel.bestLight = new Decimal(0)

        player.wel.modules[1].time = new Decimal(0)
        //player.wel.modules[1].completions = new Decimal(0)
        player.wel.modules[2].time = new Decimal(0)
        //player.wel.modules[2].completions = new Decimal(0)
        player.wel.modules[3].time = new Decimal(0)
        //player.wel.modules[3].completions = new Decimal(0)
        player.wel.modules[4].time = new Decimal(0)
        //player.wel.modules[4].completions = new Decimal(0)

        player.wel.fountains[1].completions = new Decimal(0)
        if (player.wel.fountains[1].focused) {
            player.wel.fountains[1].focused = false
            player.prj.focused = player.prj.focused.add(1)
        }
        player.wel.fountains[2].completions = new Decimal(0)
        if (player.wel.fountains[2].focused) {
            player.wel.fountains[2].focused = false
            player.prj.focused = player.prj.focused.add(1)
        }
        player.wel.fountains[3].completions = new Decimal(0)
        if (player.wel.fountains[3].focused) {
            player.wel.fountains[3].focused = false
            player.prj.focused = player.prj.focused.add(1)
        }
        player.wel.fountains[4].completions = new Decimal(0)
        if (player.wel.fountains[4].focused) {
            player.wel.fountains[4].focused = false
            player.prj.focused = player.prj.focused.add(1)
        }

        setBuyableAmount("wel", 11, new Decimal(0))
        setBuyableAmount("wel", 12, new Decimal(0))
        setBuyableAmount("wel", 13, new Decimal(0))
        setBuyableAmount("wel", 14, new Decimal(0))
    },
    branches: ["wel"],
    clickables: {
        1: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        4: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        101: {
            title() { return "<h2>Form your light into Prisms.</h2><br>Req: 1e15 Light" },
            canClick() { return player.wel.light.gte(1e15)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)"
                    look.border = "3px solid #335966"
                    look.color = "#335966"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #d6ebff"
                    look.color = "#d6ebff"
                }
                return look
            },
        },
        102: {
            title() { return "<h3>Respec Interspace Focus</h3><br><small>(you won't get your prisms back! don't be an idiot!)</small>" },
            canClick() { return player.prj.focused.gt(0)},
            unlocked() { return true },
            onClick() {
                player.prj.focused = new Decimal(0)
                Object.keys(layers.wel.fountains).forEach(i => {
                    player.wel.fountains[i].focused = false
                });
                Object.keys(layers.prj.projects).forEach(i => {
                    player.prj.modules[i].focused = false
                });
                Object.keys(layers.pri.fountains).forEach(i => {
                    player.pri.fountains[i].focused = false
                });
            },
            style() {
                let look = {width: "400px", minHeight: "75px", maxHeight: "75px", borderRadius: "10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
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
    fountains: {
        1: {
            title: "Light Cycle Fountain",
            completionEffectStat: "Light Well Cycles",
            getCompletionEffect() {
                let completions = player.pri.fountains[1].completions

                s = completions.pow(0.666).pow_base(2.5)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[1].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Light² Fountain",
            completionEffectStat: "Light, based on Light",
            getCompletionEffect() {
                let completions = player.pri.fountains[2].completions

                s = player.wel.light.add(1).log10().div(10).add(1).pow(completions.pow(0.666).mul(0.8))

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[2].completions
                let s = new Decimal(1.2e3)

                s = s.mul(completions.add(1).pow(1.25))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(50)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[2].completions
                let s = completions.div(4).add(1).pow(1.25)
                s = s.mul(1.5)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Time Capsule Fountain",
            completionEffectStat: "Stored Time Capsules",
            getCompletionEffect() {
                let completions = player.pri.fountains[3].completions

                s = completions.pow(0.666).pow_base(1.5)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[3].completions
                let s = new Decimal(1e6)

                s = s.mul(completions.add(1).pow(1.5))
                s = s.mul(completions.pow_base(2.5))
                if (completions.gte(50)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[3].completions
                let s = completions.add(1).pow(1.5)
                s = s.mul(3)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.15))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Light Speed Fountain",
            completionEffectStat: "Light Well Speed",
            getCompletionEffect() {
                let completions = player.pri.fountains[4].completions

                s = completions.pow(0.666).pow_base(2).sub(1).div(4).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[4].completions
                let s = new Decimal(1e8)

                s = s.mul(completions.add(1).pow(1.5))
                s = s.mul(completions.pow_base(2.5))
                if (completions.gte(50)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[4].completions
                let s = completions.div(2).add(1).pow(1.25)
                s = s.mul(2)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.125))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Prisms": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", 
                                    "<small>Prismatics reset light and apply a temporary nerf to light well cycle effects. Light well cycles are kept... for now.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {background: "#335966", border: "3px solid #4d9999", borderRadius: "10px", width: "600px", height: "50px", padding: "3px"}],                   
                        ], {background: "#335966", borderRadius: "13px", padding: "3px", width: "612px"}],
                        ["blank", "25px"],
                        ["clickable", 101],
                        ["style-column", [
                            ["blank", "25px"],
                            ["raw-html", "You are gaining <h3>" + format(player.pri.prisms.pow(2).div(10).mul(player.prj.projectSpeed)) + "</h3> fountain progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "<small>Total prisms give a base progress rate of " + format(player.pri.fountainSpeed) + "</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "You are focusing on " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " interspace projects.", {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                            ["blank", "25px"],
                            ["style-row", [
                                makePrismFountain(1),
                                ["blank", "6px", {width: "6px"}],
                                makePrismFountain(2),
                            ]],
                            ["blank", "6px", {width: "6px"}],
                            ["style-row", [
                                hasMilestone("prj", 203) ? makePrismFountain(3) : null,
                                ["blank", "6px", {width: "6px"}],
                                hasUpgrade("wel", 206) ? makePrismFountain(4) : null,
                            ]],
                            ["blank", "25px"],
                            ["clickable", 102],
                        ], {display: player.pri.totalPrisms.gt(0) ? "" : "none !important"}],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.pri.prisms) + "</h3> prisms." }, {color: "#d6ebff", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.pri.prismsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.pri.prismsToGet.gte(1)) {look.color = "#d6ebff"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 201)}
})
const makePrismFountain = function (id) {
    let thisFountain =
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.pri.fountains[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.pri.fountains[id].timeSpeed.lte(0) ? "<span style='color:#ff7f7f;font-size:14px'>Can't Complete w/o Prismatics!</span>" : (player.pri.fountains[id].focused ? formatTime(player.pri.fountains[id].timeReq.sub(player.pri.fountains[id].time).div(player.pri.fountains[id].timeSpeed)) : formatTime(player.pri.fountains[id].timeReq.div(player.pri.fountains[id].timeSpeed))) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.pri.fountains[id].time, 1) + "/" + format(player.pri.fountains[id].timeReq, 1) + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.pri.fountains[id].prismReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.pri.fountains[id].prismReq) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "238px", height:"25px"}],
                    ["blank", "3px"],
                    ["clickable", id],
                ], {background: "#335966", border: "3px solid #335966", borderRadius: "16px 0px 0px 0px", width: "238px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", player.pri.fountains[id].time.gte(player.pri.fountains[id].timeReq) ? "0%" : formatShortestWhole(player.pri.fountains[id].time.div(player.pri.fountains[id].timeReq).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #335966", margin: "-3px", marginTop: "75px",
                            background: player.pri.fountains[id].time.lt(player.pri.fountains[id].timeReq) ?
                            "conic-gradient(#d6ebff " + (player.pri.fountains[id].time.div(player.pri.fountains[id].timeReq)).min(1).max(0) * 360 + "deg, #000d1a 0deg)" : "#000d1a"
                        }],
                    ], {background: "#335966", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                    ["style-column", [], {background: "#4d9999", height: "78px"}],
                ], {border: "3px solid #335966", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "153px"}],
            ], {verticalAlign: "bottom"}],
            ["style-column", [
                    ["style-column", [
                    ["raw-html", formatWhole(player.pri.fountains[id].completions) + " ↻<br><small>(x" + formatShort(layers.pri.fountains[id].getCompletionEffect()) + " " + layers.pri.fountains[id].completionEffectStat + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block"}],
                ], {background: "#335966", border: "3px solid #4d9999", borderRadius: "0px 0px 7px 7px", width: "388px", height: "44px"}],
            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "0px 0px 10px 10px", borderTop: "0px", height: "50px"}],
        ], {width: "400px"}]
    return thisFountain
}