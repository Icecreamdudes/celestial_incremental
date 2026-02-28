addLayer("tl", {
    name: "Tome Library",
    symbol: "🝦",
    row: 2,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,
    }},
    nodeStyle: {
        background: "#565656",
        borderColor: "white",
    },
    tooltip: "Tome Library",
    color: "white",
    branches: ["btb", "aal"],
    bars: {},
    layerShown() { return player.startedGame == true && hasUpgrade("ktb", 210) }
})