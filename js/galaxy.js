addLayer("ga", {
    name: "Galaxy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(50deg, #333c81 0%, #241c44 100%)",
            "background-origin": "border-box",
            "border-color": "#44008b",
            "color": "#2672e3",
        };
      },

    tooltip: "Galaxy",
    color: "#333c81",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && false}
})
