addLayer("rif", {
    name: "Rift",
    symbol: "RI",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,

        tears: new Decimal(7),
        tearDivisorBase: new Decimal(4),
        tearDivisor: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#7f007f",
            background: "linear-gradient(135deg, #ff7fbf 0%, #bf7fff 100%)",
            "background-origin": "border-box",
            "border-color": "#7f007f",
        };
    },
    tooltip: "Interspace Rift",
    color: "#ff7fbf",
    update(delta) {
        player.rif.tearDivisor = player.rif.tearDivisorBase.pow(player.rif.tears)
    },
    branches: ["cep", "exm", ["cer", "#fff", 40], ["cer", "#402030", 8]],
    clickables: {
        1: {
            title() { return "<h2>TEAR</h2>" },
            canClick() { return player.points.gte("2e308")},
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1)},
            onClick() {
                player.cep.cerePointsFactor = player.cep.cerePointsFactor.add(player.cep.cerePointsFactorGain)
                player.rif.tears = player.rif.tears.add(1)
                layers.bigc.crunch()
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#ccc"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        2: {
            title() { return "<h2>TEAR</h2>" },
            canClick() { return player.in.infinityPoints.gte(1e40)},
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1)},
            onClick() {
                player.exm.exoticMatterFactor = player.exm.exoticMatterFactor.add(player.exm.exoticMatterFactorGain)
                player.rif.tears = player.rif.tears.add(1)
                layers.co.singularityReset()
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#10B844"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        3: {
            title() { return "<h2>TEAR</h2>" },
            canClick() { return true},
            unlocked() { return player.cer.transfiguratorPowerBest.gte(4)},
            onClick() {
                player.rif.tears = player.rif.tears.add(1)
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#aa0000"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        4: {
            title() { return "<h2>TEAR</h2>" },
            canClick() { return true},
            unlocked() { return player.cer.transfiguratorPowerBest.gte(4)},
            onClick() {
                player.rif.tears = player.rif.tears.add(1)
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 5px 0px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#094599"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "CE-1",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) },
            description() {return "Boost cere points based on paradox core fragments.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(1e4),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return player.cof.coreFragments[3].pow(0.15).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "CE-2",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) },
            description() {return "Boost cere points based on pollinators.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(2.5e6),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return player.pol.pollinators.add(1).log(10).div(100).pow(3).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "CE-3",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) },
            description() {return "Boost infinity points based on celestial points.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(1e11),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return player.points.pow(1/16384).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "CE-4",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(2) },
            description() {return "Boost abstract factors based on transfig tier.<br>Currently: x" + formatWhole(this.effect())},
            cost: new Decimal(1e15),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return new Decimal(2).pow(player.cer.transfiguratorPower) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "CE-5",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(3) },
            description() {return "Unlock creation in this layer."},
            cost: new Decimal(1e60),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return new Decimal(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "CE-6",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(4) },
            description() {return "Unlock destruction in this layer."},
            cost: new Decimal(1e100),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return new Decimal(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "EX-1 (WIP)",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(2) },
            description() {return "Dectuple passive infinity generation."},
            cost: new Decimal(1e6),
            currencyLocation() { return player.exm },
            currencyDisplayName: "Exotic Matter",
            currencyInternalName: "exoticMatter",
            effect() { return new Decimal(10) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "EX-2",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(2) },
            description() {return "Multiply exotic matter based on replicanti points.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(1e12),
            currencyLocation() { return player.exm },
            currencyDisplayName: "Exotic Matter",
            currencyInternalName: "exoticMatter",
            effect() { return player.cp.replicantiPoints.add(1).log(10).div(1e3).add(1)},
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "EX-3 (WIP)",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(2) },
            description() {return "Divide replicanti point cooldown based on abstract product.<br>Currently: /" + format(this.effect())},
            cost: new Decimal(1e16),
            currencyLocation() { return player.exm },
            currencyDisplayName: "Exotic Matter",
            currencyInternalName: "exoticMatter",
            effect() { return player.cer.abstractProduct.log(10).div(50).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "EX-4 (WIP)",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(3) },
            description() {return "Dectuple passive infinity generation."},
            cost: new Decimal(1e6),
            currencyLocation() { return player.exm },
            currencyDisplayName: "Exotic Matter",
            currencyInternalName: "exoticMatter",
            effect() { return new Decimal(10) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Tearing": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                                ["raw-html", () => {return "You have torn " + formatWhole(player.rif.tears) + " rifts."}, { "color": "white", "font-size": "24px", "font-family": "monospace" 
                                }],
                                ["raw-html", () => {return "Reduces factor gain by /" + format(player.rif.tearDivisor) + "."}, { "color": "white", "font-size": "18px", "font-family": "monospace" 
                                }],
                            ], {backgroundColor: "#4a254a", borderRadius: "8px 8px 0px 0px", "border-bottom": "3px solid #ffdfdf", width: "600px", "min-height": "75px"}
                        ],
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", "Force a big crunch for", { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "+" + format(player.cep.cerePointsFactorGain) + " Cere Point Factor"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "(You have " + format(player.cep.cerePointsFactor) + ")"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                ], {width: "450px"}
                            ],
                            ["clickable", 1],
                        ], {background: "linear-gradient(135deg, #666666 -50%, #4a254a 150%)", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", "Force a singularity for", { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "+" + format(player.exm.exoticMatterFactorGain) + " Exotic Matter Factor"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "(You have " + format(player.exm.exoticMatterFactor) + ")"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                ], {width: "450px"}
                            ],
                            ["clickable", 2],
                        ], {background: "linear-gradient(135deg, #085c23 -50%, #4a254a 150%)", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                        /*["style-row", [
                            ["style-column", [
                                    ["raw-html", () => {return "+" + format(player.cep.cerePointsFactorGain) + " Cere Point Factor"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "(You have " + format(player.cep.cerePointsFactor) + ")"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                    ["blank", "10px"],
                                    ["raw-html", "Forces a rocket launch.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "450px"}
                            ],
                            ["clickable", 3],
                        ], {background: "linear-gradient(135deg, #570000 -50%, #4a254a 150%)", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", () => {return "+" + format(player.cep.cerePointsFactorGain) + " Cere Point Factor"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["raw-html", () => {return "(You have " + format(player.cep.cerePointsFactor) + ")"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                    ["blank", "10px"],
                                    ["raw-html", "Forces a legendary gem reset.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "450px"}
                            ],
                            ["clickable", 4],
                        ], {background: "linear-gradient(135deg, #05234d -50%, #4a254a 150%)", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                    */
                    ], {backgroundColor: "#4a254a", border: "3px solid #ffdfdf", borderRadius: "8px", width: "600px"}],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content: [
                    ["blank", 25],
                    ["row", [
                        ["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],
                    ]],
                    ["row", [
                        ["upgrade", 21],["upgrade", 22],["upgrade", 23],["upgrade", 24],["upgrade", 25],["upgrade", 26],
                    ]],
                    ["row", [
                        ["upgrade", 31],["upgrade", 32],["upgrade", 33],["upgrade", 34],["upgrade", 35],["upgrade", 36],
                    ]],
                    ["row", [
                        ["upgrade", 41],["upgrade", 42],["upgrade", 43],["upgrade", 44],["upgrade", 45],["upgrade", 46],
                    ]]
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return player.cer.cereUnlocked ? "The product of your abstract values is <h3>" + format(player.cer.abstractProduct) + "</h3>." : ""}, {color: "#ff7fbf", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true}
})