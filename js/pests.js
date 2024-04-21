addLayer("pe", {
    name: "Pests", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        pests: new Decimal(0),
        pestsPerSecond: new Decimal(0),

        pestEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0),]
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #770022 0%, #8D71B4 100%)",
            "background-origin": "border-box",
            "border-color": "#770022",
        };
      },
    tooltip: "Pests",
    color: "#770022",
    
    update(delta) {
        let onepersec = new Decimal(1)

        if (inChallenge("ip", 12))
        {
            player.pe.pestsPerSecond = player.points.plus(1).log10().pow(1.4)
            player.pe.pests = player.pe.pests.add(player.pe.pestsPerSecond.mul(delta))
        }
        
        player.pe.pestEffect = [
            player.pe.pests.pow(1.25).add(1),
            player.pe.pests.pow(1.05).add(1),
            player.pe.pests.pow(1.05).add(1),
            player.pe.pests.pow(0.75).add(1),
            player.pe.pests.pow(1.35).add(1),
            player.pe.pests.pow(0.55).add(1),
            player.pe.pests.pow(0.45).add(1),

            Math.abs(Math.sin(Math.log10(player.pe.pests.add(1)))) * 0.1
        ]
    },
    branches: ["g", "gh"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
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
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h1>Effects" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Celestial Points: /" + format(player.pe.pestEffect[0]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Factor Power: /" + format(player.pe.pestEffect[1]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Prestige Points: /" + format(player.pe.pestEffect[2]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Leaf Gain: /" + format(player.pe.pestEffect[3]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Grass Value: /" + format(player.pe.pestEffect[4]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Lines of Code: /" + format(player.pe.pestEffect[5]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Fertilizer: /" + format(player.pe.pestEffect[6]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>Your pests are killing the grasshoppers, so -" + format(player.pe.pestEffect[7]*100) + "% grasshoppers per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>Grasshops remove 10% of your pests." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.g.grass) + "</h3> grass, which boost leaf gain by <h3>x" + format(player.g.grassEffect) + "." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "There are <h3>" + format(player.pe.pests) + "</h3> pests." }, { "color": "#770022", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.pe.pestsPerSecond) + "</h3> pests per second." }, { "color": "#770022", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && inChallenge("ip", 12) }
})