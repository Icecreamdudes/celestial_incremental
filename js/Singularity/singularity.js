var tree = []
addLayer("s", {
    name: "Universe 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "3", // This appears on the layer's node. Default is the id with the first letter capitalized
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
            background: "linear-gradient(140deg, red 0%, black 100%)",
            "background-origin": "border-box",
            "border-color": "#800000",
        }
      },

    tooltip: "Universe 3 - Domain of Singularity",
    color: "white",
    update(delta) {

        let onepersec = new Decimal(1)
        if (player.subtabs["s"]['stuff'] == 'Portal')
        {
            player.po.lastUniverse = 's'
            player.tab = "po"
            player.subtabs["s"]['stuff'] = 'Features'
        }
    },
    branches: ["in"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "po"
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
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", tree],
                        ["raw-html", function () { return "COMING SOON!!!"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("ad", 13) },
                content:
                [
                ]
            },
            "Settings": settingsMicrotab,
        },
    },

    tabFormat: [
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.ca.defeatedCante}
})
