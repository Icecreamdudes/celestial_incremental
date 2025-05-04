addLayer("ro", {
    name: "Rockets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        activatedFuel: new Decimal(0), //based on rocket fuel, golden grass, oil and charge 
        activatedFuelContributions: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], //contributions from rocket fuel, golden grass, oil and charge
        activatedFuelEffect: new Decimal(1), //boosts golden grass
        activatedFuelToGet: new Decimal(0),

        rocketParts: new Decimal(0), //based on steel, starmetal alloy, crystals and moonstone
        rocketPartsContributions: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], //contributions from steel, starmetal alloy, crystals and moonstone
        rocketPartsEffect: new Decimal(1), 
        rocketPartsToGet: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(50deg,rgb(34, 34, 34) 0%,rgb(29, 23, 56) 50%,rgb(30, 13, 97) 100%)",
            "background-origin": "border-box",
            "border-color": "#44008b",
            "color": "#2672e3",
        };
      },

    tooltip: "Rockets",
    color: "#333c81",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ro.activatedFuelContributions[0] = player.rf.rocketFuel.plus(1).log10().pow(0.3)
        player.ro.activatedFuelContributions[1] = player.g.goldGrass.plus(1).log10().div(100)
        player.ro.activatedFuelContributions[2] = player.oi.oil.plus(1).log10().div(250)
        player.ro.activatedFuelContributions[3] = player.fa.charge.plus(1).log10().div(250)

        player.ro.activatedFuelToGet = player.ro.activatedFuelContributions[0].mul(player.ro.activatedFuelContributions[1]).mul(player.ro.activatedFuelContributions[2]).mul(player.ro.activatedFuelContributions[3])

        player.ro.rocketPartsContributions[0] = player.gh.steel.plus(1).log10().pow(0.5)
        player.ro.rocketPartsContributions[1] = player.sma.starmetalAlloy.div(100)
        player.ro.rocketPartsContributions[2] = player.oi.oil.plus(1).log10().div(250)
        player.ro.rocketPartsContributions[3] = player.g.moonstone.pow(0.4).div(100)

        player.ro.rocketPartsToGet = player.ro.rocketPartsContributions[0].mul(player.ro.rocketPartsContributions[1]).mul(player.ro.rocketPartsContributions[2]).mul(player.ro.rocketPartsContributions[3]).floor()
    },
    branches: ["tad", 'ca'],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h2>Make Activated Fuel" },
            canClick() { return player.ro.activatedFuelToGet.gte('1') },
            unlocked() { return true },
            onClick() {
                player.coa.singularityPause = new Decimal(10)

                player.ro.activatedFuel = player.ro.activatedFuel.add(player.ro.activatedFuelToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { border: "3px solid rgb(27, 0, 36)", width: '300px', "min-height": '120px', borderRadius: '15px', backgroundColor: "#1b1173", color: "white" },
        },
        12: {
            title() { return "<h2>Make Rocket Parts" },
            canClick() { return player.ro.rocketPartsToGet.gte('1') },
            unlocked() { return true },
            onClick() {
                player.coa.singularityPause = new Decimal(10)

                player.g.moonstone = new Decimal(0)
                player.sma.starmetalAlloy = new Decimal(0)

                player.ro.rocketParts = player.ro.rocketParts.add(player.ro.rocketPartsToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { border: "3px solid rgb(27, 0, 36)", width: '300px', "min-height": '120px', borderRadius: '15px', backgroundColor: "#1b1173", color: "white"},
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
            "Activated Fuel": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", function () { return "You have <h3>" + format(player.ro.activatedFuel) + "</h3> activated fuel." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Activated fuel boosts golden grass gain by x<h3>" + format(player.ro.activatedFuelEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + format(player.ro.activatedFuelToGet) + "</h3> activated fuel on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", borderBottom: "0px", backgroundColor: "#1b1173", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                        ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ingredients:" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.rf.rocketFuel) + "</h3> rocket fuel, which gives a base of " + format(player.ro.activatedFuelContributions[0]) + " activated fuel." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.g.goldGrass) + "</h3> golden grass, which multiplies activated fuel by x" + format(player.ro.activatedFuelContributions[1]) + "."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil, which multiplies activated fuel x" + format(player.ro.activatedFuelContributions[2]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.fa.charge) + "</h3> charge, which multiplies activated fuel x" + format(player.ro.activatedFuelContributions[3]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundColor: "#1b1173"}],
                    ["style-column", [
                        ["raw-html", function () { return "(Converting does a singularity equivalent reset.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", borderTop: "0px", backgroundColor: "#1b1173", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}],
                    ["blank", "25px"],
                    ["clickable", 11],
                ]

            },
            "Rocket Parts": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ro.rocketParts) + "</h3> rocket parts." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Activated fuel boosts moonstone gain by x<h3>" + format(player.ro.rocketPartsEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.ro.rocketPartsToGet) + "</h3> rocket parts on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", borderBottom: "0px", backgroundColor: "#1b1173", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                        ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ingredients:" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> steel, which gives a base of " + format(player.ro.rocketPartsContributions[0]) + " rocket parts." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy, which multiplies rocket parts by x" + format(player.ro.rocketPartsContributions[1]) + "."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> crystals, which multiplies rocket parts x" + format(player.ro.rocketPartsContributions[2]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.g.moonstone) + "</h3> moonstone, which multiplies rocket parts x" + format(player.ro.rocketPartsContributions[3]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundColor: "#1b1173"}],
                    ["style-column", [
                        ["raw-html", function () { return "(Converting does a singularity equivalent reset.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                        ["raw-html", function () { return "(Rocket part gain is rounded down to the nearest integer.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", borderTop: "0px", backgroundColor: "#1b1173", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}],
                    ["blank", "25px"],
                    ["clickable", 12],
                ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 26)}
})
