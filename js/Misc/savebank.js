addLayer("savebank", {
    name: "Savebank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SVB", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Savebank",
    color: "white",
    clickables: {
        2: {
            title() { return "Settings" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank<br><small style='color:#f44'>[HEAVILY WIP]</small>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick: true,
            unlocked: true,
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
        11: {
            title() { return "Info" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Info"
            },
            style: { width: '100px', minHeight: '50px', color: 'black', background: 'grey', borderRadius: '0px', border: '2px solid white'},
        },
        12: {
            title() { return "Start<br>Check Back" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Start-Checkback"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: '#83cecf', borderRadius: '0px', border: '2px solid white'},
        },
        13: {
            title() { return "Check Back<br>Infinity" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Checkback-Infinity"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: '#094599', borderRadius: '0px', border: '2px solid white'},
        },
        14: {
            title() { return "Infinity<br>Tav" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Infinity-Tav"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        15: {
            title() { return "Tav<br>Break Infinity" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Tav-BreakInfinity"
            },
            style: { width: '150px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        16: {
            title() { return "Break Infinity<br>Cante" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "BreakInfinity-Cante"
            },
            style: { width: '150px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(150deg, #889110, 0%, #73A112 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        17: {
            title() { return "Cante<br>Singularity" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Cante-Singularity"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        18: {
            title() { return "Singularity<br>Starmetal" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Singularity-Starmetal"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(140deg, red 0%, black 120%)', borderRadius: '0px', border: '2px solid white'},
        },
        19: {
            title() { return "Starmetal<br>Matos" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Starmetal-Matos"
            },
            style: { width: '125px', minHeight: '50px', color: '#282363', background: 'linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%,#eb6077 50%, #d460eb, 75%, #60cfeb 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        21: {
            title() { return "Matos<br>End" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Matos-End"
            },
            style: { width: '125px', minHeight: '50px', color: 'black', background: 'linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        // Start-Checkback
        101: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/001.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        102: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/002.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        103: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/003.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        104: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/004.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        105: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/005.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        106: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/006.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        107: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/007.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        108: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/008.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        109: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/009.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        110: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/010.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        // Checkback-Infinity
        201: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/011.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        202: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/012.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        203: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/013.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        204: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/014.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        // Infinity-Tav
        301: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/015.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        302: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/016.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        303: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/017.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        304: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/018.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        305: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/019.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        306: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/020.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        307: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/021.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        308: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/022.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        309: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/023.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        310: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/024.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        311: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/025.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        312: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/026.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        401: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/027.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        402: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/028.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        403: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/029.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        404: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/030.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        405: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/031.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        406: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/032.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        407: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/033.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        408: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/034.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        409: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/035.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        501: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/036.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        502: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/037.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        503: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/038.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        504: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/039.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        505: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/040.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        506: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/041.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        507: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/042.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        508: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/043.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        509: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/044.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        510: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/045.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        511: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/046.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        512: {
            title: "Load",
            canClick: true,
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_5/047.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        importSave(file)
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)", borderRadius: '0px', border: '0px solid white'},
        },
    },
    microtabs: {
        stuff: {
            "Info": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", "The savebank allows you to load a save from any part of the game.<br>", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", "WARNING: Loading a save will write over your current save.<br>Please export your current save before messing with the savebank.", { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "10px"],
                    ["raw-html", "SPOILERS: Save names will spoil parts of the game, tread carefully.", { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]
            },
            "Start-Checkback": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked: true,
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "001 - Unlocked Prestige"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 101],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "002 - Unlocked Power"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 102],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "003 - Unlocked Trees"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 103],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "004 - Unlocked Grass"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 104],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "005 - Unlocked Pent 1"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 105],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "006 - Unlocked Pent 2"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 106],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "007 - First Grasshop Reset"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 107],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "008 - Unlocked Pent 3"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 108],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "009 - Unlocked Pent 5"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 109],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "010 - Unlocked Check Back"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 110],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                ]
            },
            "Checkback-Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#021124' },
                unlocked: true,
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "011 - Unlocked Portal"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 201],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "012 - Reached 1e200 Points"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 202],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "013 - Reached 1e250 Points"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 203],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "014 - Reached First Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 204],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                ]
            },
            "Infinity-Tav": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18' },
                unlocked: true,
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "015 - Halfway Through First Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 301],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "016 - Reached Second Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 302],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "017 - Halfway Through Second Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 303],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "018 - Reached Third Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 304],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "019 - First Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 305],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "020 - Second Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 306],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "021 - Third Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 307],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "022 - Fourth Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 308],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "023 - Fifth Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 309],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "024 - Sixth Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 310],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "025 - Seventh Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 311],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "026 - Eigth Infinity Challenge"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 312],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                ]
            },
            "Tav-BreakInfinity": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18' },
                unlocked: true,
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "027 - Some NIP Collected"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 401],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "028 - Fifth Tav NIP Upgrade"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 402],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "029 - Sixth Tav NIP Upgrade"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 403],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "030 - Seventh Tav NIP Upgrade"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 404],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "031 - Eigth Tav NIP Upgrade"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 405],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "032 - Ninth Tav NIP Upgrade"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 406],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "033 - First Infinity in Tav's Domain"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 407],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "034 - 1,000 OIP Grind"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 408],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "035 - Break Infinity"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 409],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                ]
            },
            "BreakInfinity-Cante": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18' },
                unlocked: true,
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "036 - 10,000 Infinities post-TAD"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 501],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "037 - BI-IP:1 and BI-NIP:2"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 502],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "038 - BI-IP:2 and BI-NIP:3<br>All hex graces"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 503],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "039 - BI-IP:4 and BI-NIP:3"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 504],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "040 - BI-IP:4 and BI-NIP:7"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 505],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "041 - BI-IP:5 and BI-NIP:7"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 506],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "042 - BI-IP:6 and BI-NIP:8"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 507],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "043 - All Pollinator Upgrades"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 508],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "044 - BI-IP:7 and BI-NIP:8"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 509],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "045 - BI-IP:8 and BI-NIP:8"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 510],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "046 - BI-IP:9 and BI-NIP:8"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 511],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                        ["style-row", [
                            ["style-row", [["raw-html", "047 - BI-IP:9 and BI-NIP:9"]], { width: "296.5px", height: "50px" }],
                            ["clickable", 512],
                        ], { width: "396.5", height: "50px", border: "2px solid white" }],
                    ]],
                    ["style-row", [
                        ["raw-html", "Credits to Sophie for making these saves!"],
                    ], { width: "796px", height: "50px", border: "2px solid white" }],
                ]
            },
            "Cante-Singularity": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2a3e66' },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
            "Singularity-Starmetal": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2D0000' },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
            "Starmetal-Matos": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2D0000' },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
            "Matos-End": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2D0000' },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [["clickable", 2], ["clickable", 7], ["clickable", 4], ["clickable", 5]]],
        ["blank", "50px"],
        ["style-column", [
            ["scroll-row", [
                ["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15],
                ["hoverless-clickable", 16], ["hoverless-clickable", 17], ["hoverless-clickable", 18], ["hoverless-clickable", 19], ["hoverless-clickable", 21],
            ], {width: "800px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)"}],
            ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ], {border: "2px solid white"}],
        ["blank", "25px"],
    ],
    layerShown() { return false }
})