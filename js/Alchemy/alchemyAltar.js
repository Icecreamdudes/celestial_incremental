addLayer("aal", {
    name: "The Alchemy Altar",
    symbol: "🝦",
    row: 3,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,
    }},
    nodeStyle: {
        background: "#ffffff",
        borderColor: "white",
    },
    tooltip: "The Alchemy Altar",
    color: "white",
    bars: {},
        layerShown() { return player.startedGame == true && hasUpgrade("ktb", 102)}
})