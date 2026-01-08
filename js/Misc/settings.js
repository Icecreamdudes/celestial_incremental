addLayer("settings", {
    name: "Settings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SET", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Settings",
    color: "white",
    clickables: {
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank<br><small style='color:#f44'>[HEAVILY WIP]</small>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        7: {
            title() { return "Jukebox" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "jukebox"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        9: {
            title: "Join the Discord!",
            canClick: true,
            unlocked: true,
            onClick() {
                window.location='https://discord.gg/icecreamdude-s-incremental-games-850817562040467556'
            },
            style: { width: "306px", minHeight: "30px", color: "#9fa6f8", background: "#5865F2", border: "3px solid #2c3279", borderRadius: "0px"},
        },
        11: {
            title() { return "Save" },
            canClick: true,
            unlocked: true,
            onClick() {
                save()
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        13: {
            title() { return "Import String" },
            canClick: true,
            unlocked: true,
            onClick() {
                importSave()
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        14: {
            title() { return "Autosave<hr style='border:1px solid #888;margin-top:1px'>" + options.autosave },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('autosave')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        15: {
            title() { return "Export File" },
            canClick: true,
            unlocked: true,
            onClick() {
                exportFile()
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        16: {
            title() { return "Export to Clipboard" },
            canClick: true,
            unlocked: true,
            onClick() {
                exportSave()
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        17: {
            title() { return "HARD RESET" },
            canClick: true,
            unlocked: true,
            onClick() {
                hardReset()
            },
            style: { width: '100px', minHeight: '80px', color: "#c88", background: "#300", borderRadius: '0', border: "3px solid #200"},
        },
        21: {
            title() { return "Hide Milestone Popups<hr style='border:1px solid #888;margin-top:1px'>" + options.hideMilestonePopups },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('hideMilestonePopups')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        22: {
            title() { return "Hide Achievement Popups<hr style='border:1px solid #888;margin-top:1px'>" + options.hideAchievementPopups },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('hideAchievementPopups')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        23: {
            title() { return "Hide General Popups<hr style='border:1px solid #888;margin-top:1px'>" + options.hideGeneralPopups },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('hideGeneralPopups')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        24: {
            title() { return "Toggle Hotkeys<hr style='border:1px solid #888;margin-top:1px'>" + options.toggleHotkey },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('toggleHotkey')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        25: {
            title() { return "Toggle Music<hr style='border:1px solid #888;margin-top:1px'>" + options.musicToggle },
            canClick: true,
            unlocked: true,
            onClick() {
                toggleOpt('musicToggle')
            },
            style: { width: '100px', minHeight: '80px', color: "#ccc", background: "var(--miscButton)", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        },
        31: {
            title: "Tree Layout",
            canClick() {return options.menuType != "Tree"},
            unlocked: "true",
            onClick() {
                options.menuType = "Tree"
            },
            style() {
                let look = {width: '100px', minHeight: '80px', color: "#ccc", borderRadius: '0'}
                if (this.canClick()) {
                    look.background = "var(--miscButton)"
                    look.border = "3px solid var(--miscButtonDisable)"
                } else {
                    look.background = "var(--miscButtonDisable)"
                    look.border = "3px solid var(--layerBackground)"
                }
                return look
            },
        },
        32: {
            title: "Tab Layout",
            canClick() {return options.menuType != "Tab"},
            unlocked: "true",
            onClick() {
                options.menuType = "Tab"
            },
            style() {
                let look = {width: '100px', minHeight: '80px', color: "#ccc", borderRadius: '0'}
                if (this.canClick()) {
                    look.background = "var(--miscButton)"
                    look.border = "3px solid var(--miscButtonDisable)"
                } else {
                    look.background = "var(--miscButtonDisable)"
                    look.border = "3px solid var(--layerBackground)"
                }
                return look
            },
        },
        101: {
            title: "Default Theme",
            canClick() {return options.theme != "default"},
            unlocked: "true",
            onClick() {
                options.theme = "default"
	            changeTheme();
	            resizeCanvas();
            },
            style() {
                let look = {width: '100px', minHeight: '80px', color: "#ccc", borderRadius: '0'}
                if (this.canClick()) {
                    look.background = "#333"
                    look.border = "3px solid #222"
                } else {
                    look.background = "#222"
                    look.border = "3px solid #161616"
                }
                return look
            },
        },
        102: {
            title: "Wood Theme",
            canClick() {return options.theme != "wood"},
            unlocked: "true",
            onClick() {
                options.theme = "wood"
	            changeTheme();
	            resizeCanvas();
            },
            style() {
                let look = {width: '100px', minHeight: '80px', color: "#ccc", borderRadius: '0'}
                if (this.canClick()) {
                    look.background = "#32261e"
                    look.border = "3px solid #211a14"
                } else {
                    look.background = "#211a14"
                    look.border = "3px solid #110d0a"
                }
                return look
            },
        },
        103: {
            title: "Coral Theme",
            canClick() {return options.theme != "coral"},
            unlocked: "true",
            onClick() {
                options.theme = "coral"
	            changeTheme();
	            resizeCanvas();
            },
            style() {
                let look = {width: '100px', minHeight: '80px', color: "#ccc", borderRadius: '0'}
                if (this.canClick()) {
                    look.background = "#331919"
                    look.border = "3px solid #261313"
                } else {
                    look.background = "#261313"
                    look.border = "3px solid #1a0d0d"
                }
                return look
            },
        },
    },
    tabFormat: [
        ["row", [["clickable", 2], ["clickable", 7], ["clickable", 4], ["clickable", 5]]],
        ["blank", "50px"],
        ["style-column", [
            ["blank", "8px"],
            ["row", [
                ["blank", "8px"],
                ["style-column", [
                    ["style-row", [
                        ["raw-html", "Save Options", {color: "#ccc", fontSize: "20px", fontFamily: "monospace"}]
                    ], {width: "306px", height: "30px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 11], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["raw-html", () => "<label class=can for='importfile' style='display:flex;align-items:center;justify-content:center;width:94px;height:74px;background:var(--miscButton);border:3px solid var(--miscButtonDisable)'>Import<br>file</label><input id='importfile' type='file' onchange='importFile()' style='display:none' />", {color: "#ccc", fontFamily: "monospace"}], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 13],
                    ], {width: "306px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 14], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 15], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 16],
                    ], {width: "306px", borderBottom: "3px solid var(--regBorder)"}],
                    ["row", [
                        ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 17], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                    ]],
                ], {width: "306px", background: "var(--layerBackground)", border: "3px solid var(--regBorder)"}],
                ["blank", "8px"],
                ["style-column", [
                    ["style-row", [
                        ["raw-html", "Toggle Options", {color: "#ccc", fontSize: "20px", fontFamily: "monospace"}]
                    ], {width: "306px", height: "30px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 21], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 22], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 23],
                    ], {width: "306px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 24],
                        ["style-column", [
                            ["raw-html", "General Hotkeys", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", "Alt - Toggle Music Off", {color: "#ccc", fontSize: "14px", fontFamily: "monospace"}],
                            ["raw-html", "[More in the future]", {color: "#ccc", fontSize: "12px", fontFamily: "monospace"}],
                        ], {width: "203px", height: "80px", borderLeft: "3px solid var(--regBorder)"}],
                    ], {width: "306px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 25],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "Volume: " + options.musicVolume}, {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "203px", height: "38px", borderBottom: "3px solid var(--regBorder)"}],
                            ["style-column", [
                                ["raw-html", () => {return "</td><td><div style=\"margin: 0 10px\"><input type=range id=volume name=Music Volume min=1 max=10 value=" + options.musicVolume + " oninput=updateMusicVolume()><br>"}, {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                            ], {width: "203px", height: "39px"}],
                        ], {width: "203px", height: "80px", borderLeft: "3px solid var(--regBorder)"}],
                    ], {width: "306px"}],
                ], {width: "306px", background: "var(--layerBackground)", border: "3px solid var(--regBorder)"}],
                ["blank", "8px"],
            ]],
            ["blank", "8px"],
            ["row", [
                ["blank", "8px"],
                ["style-column", [
                    ["style-row", [
                        ["raw-html", "Visual Options", {color: "#ccc", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "306px", height: "30px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["raw-html", "Themes", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "306px", height: "20px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["clickable", 101], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 102], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 103]
                    ], {width: "306px", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["raw-html", "Layouts", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "306px", height: "20px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 31], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                        ["clickable", 32], ["style-row", [], {width: "3px", height: "80px", background: "var(--regBorder)"}],
                    ], {width: "306px"}],
                ], {width: "306px", background: "var(--layerBackground)", border: "3px solid var(--regBorder)"}],
                ["blank", "8px"],
                ["top-column", [
                    ["style-row", [
                        ["raw-html", "Credits", {color: "#ccc", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "306px", height: "30px", borderBottom: "3px solid var(--regBorder)"}],
                    ["blank", "5px"],
                    ["raw-html", "Game by Icecreamdude<hr>", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "Music: !Sweet 150percent Icecreamdude<br>" +
                        "Content: Icecreamdude Forwaken<br>" +
                        "Ideas: Nova<br>" +
                        "Art: Jtoh_Sc Lemonsja<br>" +
                        "Testing: Nova Piterpicher<br>" +
                        "Bug Fixing: Tsanth Forwaken", {color: "#ccc", fontSize: "12px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["style-row", [
                        ["raw-html", () => "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556><button class=can style='display:flex;align-items:center;justify-content:center;width:306px;height:30px;font-size:16px;color:#dde0fc;background:#5865f2;border:3px solid #2c3279'>Join the Discord!</button></a>", {fontFamily: "monospace",}],
                    ], {width: "306px", height: "30px", borderTop: "3px solid var(--regBorder)"}],
                    ["style-row", [
                        ["raw-html", () => {return "Playtime: " + formatTime(player.timePlayed)}, {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "306px", height: "29px", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "306px", height: "241px", background: "var(--layerBackground)", border: "3px solid var(--regBorder)"}],
                ["blank", "8px"],
            ]],
            ["blank", "8px"],
        ], {width: "650px", background: "var(--miscButtonHover)", border: "3px solid var(--regBorder)"}],
        ["blank", "25px"],
    ],
    layerShown() { return false }
})