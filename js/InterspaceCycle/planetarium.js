addLayer("plt", {
    name: "Planetarium",
    symbol: "PT",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #000080 0%, #800080 100%)",
            "background-origin": "border-box",
            "border-color": "#de54de",
            "color": "white",
        };
    },
    tooltip: "Planetarium",
    color: "#de54de",
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
        ["raw-html", () => { return "You have <h3>" + "0" + "</h3> planetarium." }, {color: "#de54de", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})