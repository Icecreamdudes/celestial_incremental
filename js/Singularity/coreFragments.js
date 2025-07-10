addLayer("cof", {
    name: "Core Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CF", // This appears on the layer's node. Default is the id with the first letter capitalized
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
            background: "linear-gradient(120deg,rgb(128, 24, 11) 0%,rgb(136, 6, 82) 100%)",
            "background-origin": "border-box",
            "border-color": "#000000",
            "color": "#000000",
        };
    },
    tooltip: "Core Fragments",
    branches: ["coa","cop"],
    color: "rgb(51, 3, 31)",
    update(delta) {
        let onepersec = new Decimal(1)

    }, 
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
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
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Coming Soon!" }, { "color": "white", "font-size": "48px", "font-family": "monospace" }],
                ]
            },
        },
    }, 

    tabFormat: [
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated }
})
