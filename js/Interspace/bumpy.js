addLayer("bum", {
    name: "Bumpy",
    symbol: "BU",
    universe: "UD",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,

        starshines: new Decimal(0),

        starlight: new Decimal(0),
        starlightToGet: new Decimal(0),
        totalStarlight: new Decimal(0),

        fountainSpeed: new Decimal(1),
        
        fountains: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(60),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                starlightReq: new Decimal(1),
                completionEffect: new Decimal(1),
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
        player.bum.starlightToGet = player.wel.light.add(1).log(10).sub(100).div(6).pow_base(2).floor()
        if (player.bum.starshines.lte(0)) player.bum.starlightToGet = player.bum.starlightToGet.min(1);
        
        player.bum.fountainSpeed = player.bum.totalStarlight.pow(2).div(10)
        player.bum.fountainSpeed = player.bum.fountainSpeed.mul(player.prj.projectSpeed)

        // FOUNTAIN PROGRESS
        Object.keys(layers.bum.fountains).forEach(i => {
            let module = player.bum.fountains[i]
            let fountain = layers.bum.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.starlightReq = fountain.getstarlightReq()
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
    //branches: [["wel", "#fff", 40], ["wel", "#402030", 8]],
    branches: ["prj"],
    clickables: {
        1: {
            title() { return "<h2>Focus your light into starlight.</h2><br>Req: 1e100 Light" },
            canClick() { return player.wel.light.gte(1e100)},
            unlocked() { return true },
            onClick() {
                player.bum.starlight = player.bum.starlight.add(player.bum.starlightToGet)
                player.bum.starshines = player.bum.starshines.add(1)
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
        1001: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.bum.starlight.gte(player.bum.fountains[this.id - 1000].starlightReq) && !player.bum.fountains[this.id - 1000].focused},
            unlocked() { return true },
            onClick() {
                player.bum.starlight = player.bum.starlight.sub(player.bum.fountains[this.id - 1000].starlightReq)
                player.prj.focused = player.prj.focused.add(1)
                player.bum.fountains[this.id - 1000].focused = true
            },
            style() {
                let look = {width: "200px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffbfff"
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
            title: "ACCELERATION",
            completionEffectStat: "Light, based on Project Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.bum.fountains[1].completions.add(1)

                s = player.prj.projectSpeed.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(completions.pow(0.5))

                return s
            },
            getTimeReq() {
                let completions = player.bum.fountains[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getstarlightReq() {
                let completions = player.bum.fountains[1].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Fountains": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        makeStarlightFountain(1),
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
                        ["blank", "25px"],
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
                if (player.bum.starlightToGet.gte(1)) {look.color = "#dfffdf"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["blank", "15px"],
        ["clickable", 1],
        ["blank", "15px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 401)}
})

const makeStarlightFountain = function (id, effectIsWhole) {
    let thisFountain =
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                            ], {background: "#bfffbf", borderRadius: "0", width: "44px", height: (format(player.bum.fountains[id].time.div(player.bum.fountains[id].timeReq).min(1).max(0).mul(197))) + "px", marginTop: (format(new Decimal(197).sub(player.bum.fountains[id].time.div(player.bum.fountains[id].timeReq).min(1).max(0).mul(197)))) + "px"}],
                        ], {background: "#171117", borderRadius: "10px 0 0 10px", width: "50px", height: "197px"}],
                    ], {width: "50px", height: "0"}],
                    ["style-column", [
                        ["style-column", [
                        ], {border: "3px solid #806080", borderRadius: "10px 0 0 10px", width: "44px", height: "197px"}],
                    ], {width: "50px", height: "0"}],
                ], {background: "#806080", borderRadius: "10px 0 0 10px", width: "50px", height: "203px"}],
            ], {background: "#4d394d", border: "3px solid #4d394d", borderRadius: "10px 0 0 10px", borderRight: "0", width: "50px", height: "203px"}],
            ["style-column", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.bum.fountains[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.bum.fountains[id].timeSpeed.lte(0) ? "<span style='color:#ffff00'>Can't Complete w/o Light!</span>" : (player.bum.fountains[id].focused ? formatTime(player.bum.fountains[id].timeReq.sub(player.bum.fountains[id].time).div(player.bum.fountains[id].timeSpeed)) : player.wel.light.lte(player.bum.fountains[id].starlightReq) ? "<span style='color:#ffff00'>Can't afford!</span>" : (formatTime(player.bum.fountains[id].timeReq.div(player.bum.fountains[id].timeSpeed).mul(player.bum.fountains[id].time.div(player.bum.fountains[id].timeReq).neg().add(1)))) + " CD"), {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.bum.fountains[id].time, 1) + "/" + format(player.bum.fountains[id].timeReq, 1) + ")</small>", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.bum.fountains[id].starlightReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.bum.fountains[id].starlightReq) + " Starlight", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ], {background: "#806080", borderRadius: "0 10px 0px 0px", width: "200px", height:"25px"}],
                    ["blank", "3px"],
                    ["style-row", [
                        ["hoverless-clickable", id + 1000],
                        ["style-row", [
                            ["blank", "3px", {width: "3px"}],
                        ], {display: layers.bum.fountains[id].canAuto() ? "" : "none !important"}],
                        ["hoverless-clickable", id + 2000],
                    ], {height: "45px"}]
                ], {background: "#4d394d", border: "3px solid #4d394d", borderRadius: "0 10px 0px 0px", width: "200px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["tooltip-row", [
                            ["raw-html", formatWhole(player.bum.fountains[id].completions) + " ↻", {color: "white", fontSize: "14px", fontFamily: "monospace", lineHeight: "18px", display: "block"}],
                            ["raw-html", "<div class='bottomTooltip'>Best: " + formatShortWhole(player.bum.fountains[id].bestCompletions) + " " + layers.bum.fountains[id].title + " ↻</div>"],
                        ], {}],
                        ["raw-html", "<small>(x" + (effectIsWhole ? formatWhole(layers.bum.fountains[id].getCompletionEffect()) : formatShort(layers.bum.fountains[id].getCompletionEffect())) + " " + layers.bum.fountains[id].completionEffectStat + ")</small>", {color: "white", fontSize: "14px", fontFamily: "monospace", lineHeight: "18px", display: "block"}],
                    ], {background: "#4d394d", border: "3px solid #806080", borderRadius: "0px 0px 7px 0px", width: "197px", height: "44px"}],
                ], {background: "#806080", border: "3px solid #4d394d", borderRadius: "0px 0px 10px 0px", borderTop: "0px", borderLeft: "0px", height: "50px"}],
            ], {width: "206px"}]
        ]]
    return thisFountain
}