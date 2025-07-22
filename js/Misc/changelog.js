addLayer("changelog", {
    name: "Changelog", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CHLG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Changelog",
    color: "white",
    branches: ["branch"],
    clickables: {
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        3: {
            title() { return "Stats" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.tab = "stats"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        6: {
            title() { return "Credits" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "credits"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [

        ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6]]],

        ["blank", "50px"],

        ["raw-html", () => changelog, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
    ],
    layerShown() { return false }
})