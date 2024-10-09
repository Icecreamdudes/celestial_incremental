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
            player.tab = "po"
            player.subtabs["s"]['stuff'] = 'Features'
        }
    },
    branches: ["in"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
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
            "Settings": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                    [
                        ["blank", "25px"],
                        ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=save()>Save</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('autosave')>Autosave</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=hardReset()>HARD RESET</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=exportSave()>Export to clipboard</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=importSave()>Import</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('offlineProd')>Offline Prod</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=switchTheme()>Change Theme</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "</td><td><div style=margin: 0 10px><input type=range id=volume name=Music Volume min=1 max=10 value=" + options.musicVolume + " oninput=updateMusicVolume()><br>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Volume: " + options.musicVolume}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Autosave: " + options.autosave}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Offline Production: " + options.offlineProd}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Music Toggle: " + options.musicToggle}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Hotkey Toggle: " + options.toggleHotkey}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Playtime: " + formatTime(player.timePlayed)}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556>Join the Discord!</a>"}, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return hotkey }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return credits }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return changelog }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]
            },
        },
    }, 

    tabFormat: [
                        ["microtabs", "stuff", { 'border-width': '0px' }], 
        ],
    layerShown() { return player.startedGame == true && player.ca.defeatedCante}
})
