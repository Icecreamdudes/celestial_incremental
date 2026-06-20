addLayer("cer", {
    name: "Cere",
    symbol: "⇕",
    universe: "UD",
    row: 4,
    position: 0,
    startData() { return {
        unlocked: true,

        something: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#ff7fbf",
            background: "linear-gradient(90deg, #ffbfdf 0%, white 50%, #ffbfdf 100%)",
            "background-origin": "border-box",
            "border-color": "#ff7fbf",
        };
    },
    tooltip: "Cere, the Celestial of Cycles",
    color: "#ffdfef",
    update(delta) {
    },
    branches: ["bum"],
    clickables: {
        1: {
            title() { return "<h2>ENTER THE CYCLE.</h2><br>Req: 10 Starshine Project ↻ and 1e200 Light" },
            canClick() { return player.wel.light.gte(1e150)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "0 0 10px 10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(0deg, #ffdfef 0%, #60bfbf 125%)"
                    look.border = "3px solid #b35986"
                    look.color = "#804060"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #b35986"
                    look.color = "white"
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
            "???": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "376px"],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(0deg, #804060 50%, #b35986 50%) border-box", border: "66px solid #0000", borderRadius: "600px", width: "570px", height: "570px"}],
                    ], {width: "744px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "#804060 border-box", border: "36px solid #0000", borderRadius: "600px", width: "600px", height: "600px"}],
                    ], {width: "678px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(0deg, #ffdfef, #60bfbf) border-box", border: "30px solid #0000", borderRadius: "600px", width: "606px", height: "606px"}],
                    ], {width: "666px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {border: "72px solid #804060", borderRadius: "600px", width: "564px", height: "564px"}],
                    ], {width: "744px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["top-column", [
                                    ["blank", "3px"],
                                    ["style-column", [], {background: "#b35986", width: "600px", height: "15px"}],
                                ], {background: "#804060", width: "600px", height: "36px"}],
                            ], {width: "600px", height: "0"}],
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => { return "COMING SOON..." }, {color: "#ffdfef", fontSize: "36px", fontFamily: "monospace"}],
                                    ], {background: "#804060", border: "3px solid #b35986", borderRadius: "10px", width: "400px", height: "125px"}],
                                ], {background: "#804060", borderRadius: "13px", padding: "3px"}],
                            ], {width: "400px", height: "0"}],
                        ], {width: "600px", height: "600px"}],
                    ], {width: "600px", height: "0px"}],
                    ["blank", "376px"],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("bum", 44)}
})