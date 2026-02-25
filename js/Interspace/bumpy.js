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
        player.bum.starlightToGet = player.wel.light.add(1).div(1e50).log(10).pow_base(1.25)

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
    layerShown() { return player.startedGame == true && false}
})