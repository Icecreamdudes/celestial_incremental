addLayer("otherfeat", {
    name: "Otherworldly Features", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OTF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Otherworldly Features",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["po", [
            ["blank", "25px"],
            ["raw-html", function () { return !inChallenge("ip", 11) ? "You have <h3>" + formatWhole(player.po.featureSlots) + "/" + formatWhole(player.po.featureSlotsMax) + "</h3> free feature slots." : "No features for you!"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return inChallenge("ip", 14) ? "You can pick an OTF once you are at pent 15." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["row", [["clickable", 2], ["clickable", 3]]],
            ["blank", "25px"],
            ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15]]],
    ]]]],
    layerShown() { return false }
})
addLayer("halter", {
    name: "Halter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HALT", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Halter",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["po", [
            ["blank", "25px"],
            ["raw-html", function () { return "<h3>" + player.po.halterText[player.po.halterIndex]}],
            ["text-input", "halterInput", {
                color: "var(--color)",
                width: "400px",
                "font-family": "Calibri",
                "text-align": "left",
                "font-size": "32px",
                border: "2px solid #ffffff17",
                background: "var(--background)",
            }],
            ["blank", "25px"],
            ["row", [["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8]]],
            ["raw-html", function () { return "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?" }],
            ["raw-html", function () { return "<h4>This can help by letting you progress in OTFS while infinity is fixed. (and a whole bunch of other stuff eventually)" }],
            ["blank", "25px"],
        ]]]],
    layerShown() { return false }
})
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
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [

        ["row", [
            ["raw-html", () => "<button class=opt onclick=save()>Save</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('autosave')>Autosave</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=hardReset()>HARD RESET</button>", {"color": "red", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["row", [
            ["raw-html", () => "<button class=opt onclick=exportSave()>Export to clipboard</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=importSave()>Import string</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=switchTheme()>Change Theme</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=(toggleOpt('newMenu'));(player.tab='i')>Toggle Layout (BETA)</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["row", [
            ["raw-html", () => "<button class=opt onclick=exportFile()>Export file</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<label class=opt for='importfile' style='display:flex;align-items:center;justify-content:center;width:92px;height:92px;'>Import<br>file</label><input id='importfile' type='file' onchange='importFile()' style='display:none' />", {"color": "white", "font-size": "13.3333px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
            ["raw-html", () => "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys</button>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ]],

        ["blank", "25px"],

        ["raw-html", () => "</td><td><div style=\"margin: 0 10px\"><input type=range id=volume name=Music Volume min=1 max=10 value=" + options.musicVolume + " oninput=updateMusicVolume()><br>", {"color": "white", "font-size": "18px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () =>  "Volume: " + options.musicVolume, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["raw-html", () => "Autosave: " + options.autosave, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["raw-html", () => "Sidebar Layout: " + options.newMenu, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["raw-html", () => "Music Toggle: " + options.musicToggle, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
        ["raw-html", () => "Hotkey Toggle: " + options.toggleHotkey, {"color": "white", "font-size": "18px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () => "Playtime: " + formatTime(player.timePlayed), {"color": "white", "font-size": "18px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () => "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556>Join the Discord!</a>", {"color": "white", "font-size": "36px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () => hotkey, {"color": "white", "font-size": "18px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () => credits, {"color": "white", "font-size": "18px", "font-family": "monospace",}],

        ["blank", "25px"],

        ["raw-html", () => changelog, {"color": "white", "font-size": "18px", "font-family": "monospace",}],
    ],
    layerShown() { return false }
})
addLayer("u1u", {
    name: "u1u", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U1U", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["i", [
            ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["row", [["upgrade", 11], ["upgrade", 1], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
            ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
            ["row", [["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 29]]],
            ["row", [["upgrade", 31]]],
            ["row", [["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 41]]],
            ["blank", "25px"],
            ["tree", gwa],
        ]]]],
    layerShown() { return false }
})
addLayer("a1u", {
    name: "a1u", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1U", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["cp", [
            ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["row", [["bar", "replicantiBar"]]],
            ["blank", "25px"],
            ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
            ["row", [["upgrade", 17], ["upgrade", 18]]],
        ]]]],
    layerShown() { return false }
})
addLayer("a1s", {
    name: "a1s", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1S", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Softcap",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["cp", [
            ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["row", [["bar", "replicantiBar"]]],
            ["blank", "25px"],
            ["raw-html", function () { return "Softcap starts at <h3>" + format(player.cp.replicantiSoftcapStart) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcapEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap starts at <h3>" + format(player.cp.replicantiSoftcap2Start) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcap2Effect) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
        ]]]],
    layerShown() { return false }
})
