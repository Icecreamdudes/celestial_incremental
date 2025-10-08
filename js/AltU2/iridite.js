
addLayer("ir", {
    name: "Iridite", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✦", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#151230",
            backgroundOrigin: "border-box",
            borderColor: "#ffffffff",
            color: "#eaf6f7",
        };
    },
    tooltip: "Iridite, the Astral Celestial",
    branches: ["pl", "se"],
    color: "#279ccf",
    update(delta) {

    },
    bars: {
    },
    clickables: {
        1: {
            title() { return "<h2>Stop Travel" },
            canClick() { return player.se.currentlyTravelling },
            unlocked() { return true },
            onClick() {
                player.se.currentlyTravelling = false
            },
            style: { width: '200px', "min-height": '50px' },
        },
    },
    levelables: {},
    upgrades: {},
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.se.starsExploreCount[0][5].gte(1) }
})
