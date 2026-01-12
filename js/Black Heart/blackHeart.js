const BHC = {}
const BHS = {}
addLayer("bh", {
    name: "Black Heart", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♥", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celestialite: {
            id: "none",

        },
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #333 0%, #222 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#8a0e79",
            color: "black",
        };
    },
    tooltip: "Black Heart",
    branches: ["ma"],
    color: "#8a0e79",
    update(delta) {

    },
    clickables: {},
    bars: {},
    microtabs: {
        stuff: {

        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})