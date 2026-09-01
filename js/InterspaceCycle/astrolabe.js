addLayer("ast", {
    name: "Astrolabe",
    symbol: "AL",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)",
            "background-origin": "border-box",
            "border-color": "#bf30bf",
            "color": "#bf30bf",
        };
    },
    tooltip: "Astrolabe",
    color: "#dea6de",
    update(delta) {
        
    },
    branches: ["plt", "bea"],
    clickables: {
        "reset": {
            title() { return "<h2>Merge your planetarium into astro.</h2><br>Req: 1,000,000 Cosmic Score" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                //
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)"
                    look.border = "2px solid #bf30bf"
                    look.color = "#bf30bf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #dea6de"
                    look.color = "#dea6de"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Astrolabe": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["clickable", "reset"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + "0" + "</h3> planetarium." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Your cosmic score is <h3>" + "0" + "</h3>." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + "0" + "</h3> astro." }, {color: "#dea6de", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + "0" + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (false) {look.color = "#dea6de"} else {look.color = "gray"}
                return look
            }],
        ]],["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})