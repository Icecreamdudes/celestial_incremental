var treeAU2 = [["st"], ["pl"]]
addLayer("au2", {
    name: "Alt-Universe 2: Cosmic Cosmos", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        au2Unlocked: false,

        stars: new Decimal(0),
        starsToGet: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #5A4FCF 0%, #242124 74%)",
            "background-origin": "border-box",
            "border-color": "#270052",
        }
    },
    tooltip: "Alt-Universe 2: Cosmic Cosmos",
    color: "#5A4FCF",
    branches: ["in", "cp"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.au2.starsToGet = Decimal.mul(player.ro.rocketParts, player.ro.activatedFuel.pow(0.3)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("st", 209)[0]).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(buyableEffect("st", 201)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(buyableEffect("ma", 31)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("pet", 501)[0]).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("pu", 109)[2]).floor()
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["tree", treeAU2],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.au2.au2Unlocked}
})
