addLayer("sh", {
    name: "Spaceship",
    symbol: "SH",
    universe: "A2",
    row: 4,
    position: 0,
    startData() { return {
        unlocked: true,

        something: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "yellow",
            background: "linear-gradient(0deg, #c5c5c5ff 0%, #5A4FCF 50%, #c5c5c5ff 100%)",
            "background-origin": "border-box",
            "border-color": "#5A4FCF",
        };
    },
    tooltip: "Spaceship",
    color: "#5A4FCF",
    update(delta) {
    },
    branches: ["st", "pl", "se", "ir"],
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
            "???": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                ]
            },
        }
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && false}
})