addLayer("changelog", {
    name: "Changelog", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CHLG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Changelog",
    color: "white",
    clickables: {
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "var(--textColor)", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank<br><small style='color:#f44'>[HEAVILY WIP]</small>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "var(--textColor)", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "var(--textColor)", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        7: {
            title() { return "Jukebox" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "jukebox"
            },
            style: { width: '125px', minHeight: '50px', color: "var(--textColor)", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
    },
    tabFormat: [
        ["row", [["clickable", 2], ["clickable", 7], ["clickable", 4], ["clickable", 5]]],
        ["blank", "50px"],
        ["raw-html", () => changelog, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["blank", "25px"],
    ],
    layerShown() { return false }
})