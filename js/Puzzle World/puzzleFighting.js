addLayer("pf", {
    name: "Puzzle Fighting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Puzzle Fighting",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ak"],
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ak.puzzlePoints) + "</h3> puzzle points. (+" + format(player.ak.puzzlePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true } // change later
})