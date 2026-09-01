addLayer("for", {
    name: "Foraging",
    symbol: "FG",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, white 0%, #a8bfb4 100%)",
            "background-origin": "border-box",
            "border-color": "#208080",
            "color": "#208080",
        };
    },
    tooltip: "Foraging",
    color: "#a8bfb4",
    update(delta) {
        

    },
    branches: ["bea", "mre"],
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
            "Map": {
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