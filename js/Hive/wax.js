
addLayer("wa", {
    name: "Wax", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        wax: new Decimal(0),
        waxGain: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            backgroundColor: "#f3e3c2",
            borderColor: "#997F4C",
        }
    },
    tooltip: "Wax",
    color: "#f3e3c2",
    branches: ["bb" ,"ho"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.wa.waxGain = Decimal.mul(player.bb.beeBread.div(1e10).pow(0.25), player.ho.honey.div(1e10).pow(0.25)).pow(0.5)
    },
    clickables: {
        1: {
            title() { return "Gain Wax, but reset previous content.<br><small>Req: 1e10 Bee Bread and Honey</small>" },
            canClick() { return player.bb.beeBread.gte(1e10) && player.ho.honey.gte(1e10)},
            unlocked: true,
            onClick() {
                player.wa.wax = player.wa.wax.add(player.wa.waxGain)
                layers.al.prestigeReset()
            },
            style() {
                let look = { width: '300px', minHeight: '80px', fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'}
                if (this.canClick()) {look.background = "#f3e3c2"} else {look.background = "#bf8f8f"}
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        Tabs: {
            "Main": {
                buttonStyle: {borderColor: "#f3e3c2", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => {return "You have " + formatWhole(player.wa.wax) + " Wax"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + formatWhole(player.wa.waxGain) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 1],
                ],
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["raw-html", () => {return "You have " + format(player.bb.beeBread) + " Bee Bread"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(" + format(player.bb.beeBreadPerSecond) + "/s)"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["style-row", [
            ["raw-html", () => {return "You have " + format(player.ho.honey) + " Honey"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(" + format(player.ho.honeyPerSecond) + "/s)"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["microtabs", "Tabs", {borderWidth: "0"}],
        ["blank", "20px"],
    ],
    layerShown() { return player.startedGame && player.bee.path == 0 && player.bee.extremePath}
})
// #997F4C
// #665533