addLayer("settings", {
    name: "Settings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SET", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Settings",
    color: "white",
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = player.po.lastUniverse
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        3: {
            title() { return "Stats" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.tab = "stats"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        6: {
            title() { return "Credits" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "credits"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["clickable", 1],
        ["blank", "25px"],
        ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6]]],
        ["blank", "50px"],

        ["row", [
            ["raw-html", () => "<button class=opt onclick=save()>Save</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('autosave')>Autosave:<br>" + options.autosave + "</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=hardReset() style='color:darkred'>HARD RESET</button>", {"color": "red", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=switchTheme()>Change Theme</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["row", [
            ["raw-html", () => "<button class=opt onclick=exportSave()>Export to clipboard</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=importSave()>Import string</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('hideMilestonePopups'); needsCanvasUpdate = true>Hide Milestone Popups:<br>" + options.hideMilestonePopups + "</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('newMenu')>Toggle Layout:<br>" + options.newMenu + "</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["row", [
            ["raw-html", () => "<button class=opt onclick=exportFile()>Export file</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<label class=opt for='importfile' style='display:flex;align-items:center;justify-content:center;width:92px;height:92px;'>Import<br>file</label><input id='importfile' type='file' onchange='importFile()' style='display:none' />", {"color": "white", "font-size": "13.3333px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music:<br>" + options.musicToggle + "</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys:<br>" + options.toggleHotkey + "</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["blank", "25px"],
        ["raw-html", () => "</td><td><div style=\"margin: 0 10px\"><input type=range id=volume name=Music Volume min=1 max=10 value=" + options.musicVolume + " oninput=updateMusicVolume()><br>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["raw-html", () =>  "Volume: " + options.musicVolume, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["blank", "25px"],
        ["raw-html", () => hotkey, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
    ],
    layerShown() { return false }
})