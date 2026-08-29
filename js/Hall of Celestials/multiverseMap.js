addLayer("mm", {
    name: "Multiverse Map", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MM", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#0000007f",
            background: "linear-gradient(0deg, #30bf9b 0%, #208080 50%, #309bbf 100%)",
            "background-origin": "border-box",
            "border-color": "#0000007f",
        };
    },
    tooltip: "Multiverse Map",
    color: "#30bfbf",
    update(delta) {
    },
    branches: ["ch"],
    clickables: {
        401: {
            universeId() { return "U1"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 0,
            yPos: 0,
        },
        402: {
            universeId() { return "U2"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: -500,
            yPos: 100,
        },
        403: {
            universeId() { return "UA"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 100,
            yPos: 100,
        },
        404: {
            universeId() { return "A1"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 200,
            yPos: -200,
        },
        405: {
            universeId() { return "U3"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: -700,
            yPos: 500,
        },
        406: {
            universeId() { return "CH"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 1250,
            yPos: -350,
        },
        407: {
            universeId() { return "D1"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 50,
            yPos: 300,
        },
        408: {
            universeId() { return "A2"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: -1250,
            yPos: 250,
        },
        409: {
            universeId() { return "UB"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name()},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: 500,
            yPos: -500,
        },
        410: {
            universeId() { return "UD"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: -500,
            yPos: 700,
        },
        411: {
            universeId() { return "DS"},
            title() { return universes[this.universeId()].symbol},
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return universes[this.universeId()].name()},
            onClick() {},
            onHold() {},
            style() {
                let look = {position: "relative", top: this.yPos + "px", left: this.xPos + "px", color: universes[this.universeId()].nodeStyle().color, background: universes[this.universeId()].nodeStyle().background, backgroundColor: universes[this.universeId()].nodeStyle().backgroundColor, border: "3px solid " + universes[this.universeId()].nodeStyle().borderColor, width: "100px", minHeight: "100px", fontSize: "32px", borderRadius: "50%"}
                return look
            },
            xPos: -300,
            yPos: 500,
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
            "Dimensional Realm": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "THE DIMENSIONAL REALM", {color: "#008000", fontSize: "36px", fontFamily: "monospace"}]
                    ], {background: "linear-gradient(90deg, #54bf30 0%, #80ff80 50%, #30bf54 100%)", border: "3px solid #008000", borderBottom: "0", borderRadius: "10px 10px 0px 0px", width: "800px", height: "50px"}],
                    ["centered-draggable-scroll-row", [
                        ["style-row", [
                            ["style-row", [
                                createMultiverseMapConnection(401, 402),
                                createMultiverseMapConnection(401, 403),
                                createMultiverseMapConnection(401, 404),
                                createMultiverseMapConnection(402, 405),
                                createMultiverseMapConnection(404, 406),
                                createMultiverseMapConnection(401, 407),
                                createMultiverseMapConnection(402, 408),
                                createMultiverseMapConnection(404, 409),
                                createMultiverseMapConnection(405, 410),
                                createMultiverseMapConnection(401, 411),
                            ], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 401]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 402]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 403]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 404]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 405]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 406]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 407]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 408]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 409]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 410]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 411]], {width: "0", height: "0"}],
                            ["blank", "", {width: "100px", height: "0"}],
                        ], {backgroundImage: "url(resources/unknown/dimensionalRealmBg.png)", width: "4000px", height: "4000px"}],
                    ], {border: "3px solid #008000", width: "800px", height: "800px", flexFlow: "column"}],
                    ["style-column", [], {background: "linear-gradient(90deg, #54bf30 0%, #80ff80 50%, #30bf54 100%)", border: "3px solid #008000", borderTop: "0", borderRadius: "0px 0px 10px 10px", width: "800px", height: "25px"}],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame && player.s.pylonBuilt }
})

function createMultiverseMapConnection(id_1, id_2) {
    return ["style-row", [], {
        position: "relative",
            left: () => {return ((layers.mm.clickables[id_1].xPos + layers.mm.clickables[id_2].xPos) / 2) + "px"},
            top: () => {return ((layers.mm.clickables[id_1].yPos + layers.mm.clickables[id_2].yPos) / 2) + "px"},
            transform: () => {return "rotate(" + Math.atan2(layers.mm.clickables[id_2].yPos - layers.mm.clickables[id_1].yPos, layers.mm.clickables[id_2].xPos - layers.mm.clickables[id_1].xPos) + "rad)"},
            width: () => {return Math.sqrt(Math.pow(layers.mm.clickables[id_2].yPos - layers.mm.clickables[id_1].yPos, 2) + Math.pow(layers.mm.clickables[id_2].xPos - layers.mm.clickables[id_1].xPos, 2)) + "px"},
            height: "0px", border: "4px dotted #00ff00", borderBottom: "0", marginLeft: "100px", marginTop: "-4px"
        }]
}