addLayer("bea", {
    name: "Beacons of Blacklight",
    symbol: "BE",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #d0a1ff 0%, #f0e0ff 100%)",
            "background-origin": "border-box",
            "border-color": "#572d80",
            "color": "#572d80",
        };
    },
    tooltip: "Beacons of Blacklight",
    color: "#f0ffe0",
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
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", "You have <h3>" + "0" + "</h3> blacklight.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})