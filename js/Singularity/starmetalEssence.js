addLayer("sme", {
    name: "Starmetal Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SME", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",
            "background-origin": "border-box",
            "border-color": "#282363",
            "color": "#282363",
        };
    },
    tooltip: "Starmetal Essence",
    branches: ["ma", "sd", "sma"],
    color: "#d460eb",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Coming Soon!" }, { "color": "white", "font-size": "48px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]
            },
        },
    }, 
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated }
})
