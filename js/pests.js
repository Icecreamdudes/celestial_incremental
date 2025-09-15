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
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #770022 0%, #8D71B4 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#770022",
        };
    },
    tooltip: "Pests",
    color: "#411c35",
    update(delta) {
        let onepersec = new Decimal(1)

        if (inChallenge("ip", 12) || inChallenge("ip", 18)) {
            if (inChallenge("ip", 12)) player.pe.pestsPerSecond = player.points.plus(1).log10().pow(1.4)
            if (inChallenge("ip", 18)) player.pe.pestsPerSecond = player.points.plus(1).log10().pow(2.6)
            player.pe.pestsPerSecond = player.pe.pestsPerSecond.div(player.de.antidebuffPointsEffect)
            player.pe.pests = player.pe.pests.add(player.pe.pestsPerSecond.mul(delta))
        }

        player.pe.pestEffect = [
            player.pe.pests.pow(1.25).div(10).add(1),
            player.pe.pests.pow(1.05).div(10).add(1),
            player.pe.pests.pow(1.05).div(10).add(1),
            player.pe.pests.pow(0.75).div(10).add(1),
            player.pe.pests.pow(1.35).div(10).add(1),
            player.pe.pests.pow(0.55).div(10).add(1),
            player.pe.pests.pow(0.45).div(10).add(1),

            Math.abs(Math.sin(Math.log10(player.pe.pests.add(1)))) * 0.1
        ]
    },
    branches: ["g", "gh"],
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => { return "<h1>Effects" }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["blank", "5px"],
                        ["h-line", "350px"],
                        ["blank", "5px"],
                        ["raw-html", () => { return "<h2>Celestial Points: /" + formatShort(player.pe.pestEffect[0]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Factor Power: /" + formatShort(player.pe.pestEffect[1]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Prestige Points: /" + formatShort(player.pe.pestEffect[2]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Leaf Gain: /" + formatShort(player.pe.pestEffect[3]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Grass Value: /" + formatShort(player.pe.pestEffect[4]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Lines of Code: /" + formatShort(player.pe.pestEffect[5]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "<h2>Fertilizer: /" + formatShort(player.pe.pestEffect[6]) }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ], {width: "400px", padding: "10px 20px", backgroundColor: "#1a0b15", border: "3px solid #411c35", borderRadius: "20px"}],
                        ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", () => { return "<h2>Your pests are killing the grasshoppers,<br>so -" + formatShort(player.pe.pestEffect[7]*100) + "% grasshoppers per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["blank", "10px"],
                        ["raw-html", () => { return "<h2>Grasshops remove 10% of your pests." }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ], {width: "600px", padding: "10px", backgroundColor: "#1a0b15", border: "3px solid #411c35", borderRadius: "20px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "There are <h3>" + format(player.pe.pests) + "</h3> pests" }, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
            ["raw-html", () => { return "(+" + format(player.pe.pestsPerSecond) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && (inChallenge("ip", 12) || inChallenge("ip", 18)) },
    deactivated() { return !(inChallenge("ip", 12) || inChallenge("ip", 18))},
})
