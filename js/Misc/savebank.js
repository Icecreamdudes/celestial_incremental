addLayer("savebank", {
    name: "Savebank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SVB", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Savebank",
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
            unlocked() { return true },
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
        11: {
            title() { return "Info" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Info"
            },
            style: { width: '100px', minHeight: '50px', color: 'black', background: 'grey', borderRadius: '0px', border: '2px solid white'},
        },
        12: {
            title() { return "Start<br>Check Back" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Start-Checkback"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: '#83cecf', borderRadius: '0px', border: '2px solid white'},
        },
        13: {
            title() { return "Check Back<br>Infinity" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Checkback-Infinity"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: '#06366e', borderRadius: '0px', border: '2px solid white'},
        },
        14: {
            title() { return "Infinity<br>Tav" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Infinity-Tav"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        15: {
            title() { return "Tav<br>Break Infinity" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Tav-BreakInfinity"
            },
            style: { width: '150px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        16: {
            title() { return "Break Infinity<br>Cante" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "BreakInfinity-Cante"
            },
            style: { width: '150px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(150deg, #889110, 0%, #73A112 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        17: {
            title() { return "Cante<br>Singularity" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Cante-Singularity"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        18: {
            title() { return "Singularity<br>End" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["savebank"]["stuff"] = "Singularity-End"
            },
            style: { width: '125px', minHeight: '50px', color: 'rgba(0,0,0,0.8)', background: 'linear-gradient(140deg, red 0%, black 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        // Start-Checkback
        101: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/001.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        102: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/002.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        103: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/003.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        104: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/004.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        105: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/005.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        106: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/006.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        107: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/007.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        108: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/008.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        109: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/009.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        110: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_1/010.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#83cecf", borderRadius: '0px', border: '0px solid white'},
        },
        // Checkback-Infinity
        201: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
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
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/012.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        203: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/013.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        204: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_2/014.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "#06366e", borderRadius: '0px', border: '0px solid white'},
        },
        // Infinity-Tav
        301: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/015.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        302: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/016.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        303: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/017.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        304: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/018.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        305: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/019.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        306: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/020.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        307: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/021.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        308: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/022.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        309: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/023.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        310: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/024.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        311: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/025.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        312: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_3/026.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        401: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/027.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        402: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/028.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        403: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/029.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        404: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/030.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        405: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/031.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        406: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/032.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        407: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/033.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        408: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/034.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
        409: {
            title() { return "Load" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (confirm("Are you sure you want to load this save?")) {
                    const xhttp = new XMLHttpRequest()
                    xhttp.open("GET", "Savebank/Stage_4/035.txt", true)
                    xhttp.onload = function () {
                        let file = this.responseText
                        file.then(data => importSave(data))
                    }
                    xhttp.send()
                }
            },
            style: { width: '100px', minHeight: '50px', background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderRadius: '0px', border: '0px solid white'},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Info": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return true },
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
                unlocked() { return true },
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
                unlocked() { return true },
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
                unlocked() { return true },
                content: [
                    ["row", [
                        ["style-row", [
                            ["style-row", [["raw-html", "015 - Re-Reached Portal"]], { width: "296.5px", height: "50px" }],
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
                unlocked() { return true },
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
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
            "Cante-Singularity": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2a3e66' },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
            "Singularity-End": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#2D0000' },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", "WIP"],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [

        ["clickable", 1],

        ["blank", "25px"],

        ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6]]],

        ["blank", "50px"],

        ["style-column", [
            ["scroll-row", [["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15], ["hoverless-clickable", 16], ["hoverless-clickable", 17], ["hoverless-clickable", 18]], {width: "800px"}],
            ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ], {border: "2px solid white"}],

    ],
    layerShown() { return false }
})