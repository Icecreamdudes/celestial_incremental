addLayer("gt", {
    name: "Gwa Temple", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/gwa.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "The Temple of Gwa",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                ]

            },
        },
    }, 

    tabFormat: [
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true }
})