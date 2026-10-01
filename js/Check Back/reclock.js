addLayer("rc", {
    name: "Reclock", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RC", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

    }},
    nodeStyle: {
        background: "radial-gradient(circle,#77bbdd, #222f3d)",
		backgroundOrigin: "border-box",
		borderColor: "#c6f7ff",
		color: "#c6f7ff"
    },
    tooltip: "Reclock",
    color: "white",
    branches: ["cb"],
    automate() {
    },
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    buyables: {

    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {color: "#8fc0f3", borderColor: "#8fc0f3", backgroundColor: "#222f3d", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => {return "COMING SOON"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],

                ]
            },
        },
    },
    tabFormat: [

        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("ev8", 33) }
})