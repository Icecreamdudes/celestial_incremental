addLayer("ma", {
    name: "Matos", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⊘", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        mMax: false,

        matosUnlock: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(53, 8, 19)",
            "color": "rgb(0, 0, 0)",
        };
    },
    tooltip: "Matos, Celestial of Machinery",
    branches: ["sma",],
    color: "rgb(138, 14, 121)",
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
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.ma.mMax == false },
            unlocked() { return true },
            onClick() {
                player.ma.mMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.ma.mMax == true  },
            unlocked() { return true },
            onClick() {
                player.ma.mMax = false
            },
            style: { width: '75px', "min-height": '50px', }
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
  
                    ["blank", "25px"],
                    ["raw-html", function () { return "Coming Soon!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

    ]

            },

        },
    }, 

    tabFormat: [

        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.le.punchcardsUnlocked[15]  }
})
