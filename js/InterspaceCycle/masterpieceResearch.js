addLayer("mre", {
    name: "Masterpiece Research",
    symbol: "MR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#fff0f7",
            "background-origin": "border-box",
            "border-color": "#408060",
            "color": "#408060",
        };
    },
    tooltip: "Masterpiece Research",
    color: "#fff0f7",
    update(delta) {
        

    },
    branches: ["cer"],
    clickables: {
        
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
            "Field": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + "0" + "</h3> blacklight." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})