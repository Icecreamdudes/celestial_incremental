addLayer("car", {
    name: "Cards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(60deg, rgb(182, 0, 0) 0%, rgb(24, 24, 24) 50%, rgb(182, 0, 0) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(182, 0, 0)",
            "color": "white",
            borderRadius: "4px",
            transform: "translateX(50px)"
        }
    },
    tooltip: "Cards",
    color: "rgb(182, 0, 0)",
    branches: ["cbs",],
    update(delta) {
    },
    clickables: {
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                ["raw-html", function () { return "Coming Soon!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 21) && !player.sma.inStarmetalChallenge}
})
