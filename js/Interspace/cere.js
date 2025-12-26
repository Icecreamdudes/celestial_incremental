addLayer("cer", {
    name: "Cere",
    symbol: "⇕",
    universe: "UD",
    row: 5,
    position: 0,
    startData() { return {
        unlocked: true,

        cereUnlocked: false,
        transfiguratorPower: new Decimal(0),
        transfiguratorPowerBest: new Decimal(0),
        transfiguratorPowerSpendable: new Decimal(0),
        transfiguratorLayersEnabled: [false, false, false, false],

        rebootCooldown: new Decimal(0),
        rebootCooldownSpeed: new Decimal(1),

        abstractProduct: new Decimal(0),
        abstractEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#ff7fbf",
            background: "#ffdfef",
            "background-origin": "border-box",
            "border-color": "#ff7fbf",
        };
    },
    tooltip: "Cere, the Celestial of Distortion",
    color: "#ffdfef",
    update(delta) {
        player.cer.abstractEffect = player.cer.abstractProduct.add(1).log(10).pow(0.75).div(100).add(1)

        player.cer.abstractProduct = player.cep.cerePoints.add(1).mul(player.exm.exoticMatter.add(1))

        player.cer.rebootCooldownSpeed = new Decimal(1).add(player.cer.abstractProduct.log(10).div(100)).pow(5)
    },
    rebootReset() {
        player.cer.transfiguratorPower = new Decimal(0)
        player.cer.transfiguratorPowerSpendable = new Decimal(0)
        player.cer.transfiguratorLayersEnabled = [false, false, false, false]

        player.rif.tears = new Decimal(0)
        player.cep.cerePoints = new Decimal(0)
        player.exm.exoticMatter = new Decimal(0)

        setBuyableAmount("cep", 1, new Decimal(0))
        setBuyableAmount("cep", 2, new Decimal(0))
        setBuyableAmount("cep", 3, new Decimal(0))

        setBuyableAmount("exm", 1, new Decimal(0))
        setBuyableAmount("exm", 2, new Decimal(0))
        setBuyableAmount("exm", 3, new Decimal(0))
    },
    branches: [["cep", "#ff7fbf"], ["exm", "#ff7fbf"], ["der", "#ff7fbf"], ["uns", "#ff7fbf"], ["ats", "#fff", 40], ["ats", "#402030", 8]],
    clickables: {
        1: {
            title() { return "<h2>" + (player.cer.cereUnlocked ? (this.canClick() ? "Tier-up the transfigurator to tier " + formatWhole(player.cer.transfiguratorPower.add(1)): "Insufficient resources to tier-up") : "DESTROY CERE'S CORE") + "</h2>" },
            canClick() { return player.in.infinities.gte(new Decimal(1e16).mul(new Decimal(100).pow(player.cer.transfiguratorPower))) && player.cof.coreFragments[3].gte(new Decimal(1e3).mul(new Decimal(4).pow(player.cer.transfiguratorPower))) && player.cer.abstractProduct.gte(new Decimal(1e12).mul(new Decimal(1e12).pow(player.cer.transfiguratorPower.pow(2))).div(1e12).sub(1))},
            unlocked() { return true },
            onClick() {
                player.cer.cereUnlocked = true
                player.cer.transfiguratorPower = player.cer.transfiguratorPower.add(1)
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.add(1)
                if (player.cer.transfiguratorPower.gt(player.cer.transfiguratorPowerBest)) player.cer.transfiguratorPowerBest = player.cer.transfiguratorPower;
                player.rif.tears = new Decimal(0)
            },
            style() {
                let look = {width: "600px", minHeight: "75px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffdfef"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        2: {
            title() { return "<h2>Reboot</h2><br><h3>Respec rifts and PWR, but set transfigurator tier to 0.</h3>" },
            canClick() { return player.cer.transfiguratorPower.gt(0) },
            unlocked() { return true },
            onClick() {
                layers.cer.rebootReset()
            },
            style() {
                let look = {width: "600px", minHeight: "75px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffdfef"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        11: {
            title() { return "<h2>" + (player.cer.transfiguratorLayersEnabled[0] ? "ACTIVE" : "Activate<br>(1 PWR)") + "</h2>" },
            canClick() { return player.cer.transfiguratorPowerSpendable.gte(1) && !player.cer.transfiguratorLayersEnabled[0]},
            unlocked() { return true },
            onClick() {
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.sub(1)
                player.cer.transfiguratorLayersEnabled[0] = true
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (player.cer.transfiguratorLayersEnabled[0]) {
                    look.background = "#ffdfef"
                } else if (this.canClick()) {
                    look.background = "#ccc"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        12: {
            title() { return "<h2>" + (player.cer.transfiguratorLayersEnabled[1] ? "ACTIVE" : (player.cer.transfiguratorPower.gte(2) ? "Activate<br>(1 PWR)" : "Req:<br>Tier 2")) + "</h2>" },
            canClick() { return player.cer.transfiguratorPowerSpendable.gte(1) && player.cer.transfiguratorPower.gte(2) && !player.cer.transfiguratorLayersEnabled[1]},
            unlocked() { return true },
            onClick() {
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.sub(1)
                player.cer.transfiguratorLayersEnabled[1] = true
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (player.cer.transfiguratorLayersEnabled[1]) {
                    look.background = "#ffdfef"
                } else if (this.canClick()) {
                    look.background = "#10B844"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        13: {
            title() { return "<h2>" + (player.cer.transfiguratorLayersEnabled[2] ? "ACTIVE" : (player.cer.transfiguratorPower.gte(4) ? "Activate<br>(3 PWR)" : "Req:<br>Tier 4")) + "</h2>" },
            canClick() { return player.cer.transfiguratorPowerSpendable.gte(3) && player.cer.transfiguratorPower.gte(4) && !player.cer.transfiguratorLayersEnabled[2]},
            unlocked() { return true },
            onClick() {
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.sub(3)
                player.cer.transfiguratorLayersEnabled[2] = true
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "black"}
                if (player.cer.transfiguratorLayersEnabled[2]) {
                    look.background = "#ffdfef"
                } else if (this.canClick()) {
                    look.background = "#aa0000"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        14: {
            title() { return "<h2>" + (player.cer.transfiguratorLayersEnabled[3] ? "ACTIVE" : (player.cer.transfiguratorPower.gte(5) ? "Activate<br>(3 PWR)" : "Req:<br>Tier 5")) + "</h2>" },
            canClick() { return player.cer.transfiguratorPowerSpendable.gte(3) && player.cer.transfiguratorPower.gte(5) && !player.cer.transfiguratorLayersEnabled[3]},
            unlocked() { return true },
            onClick() {
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.sub(3)
                player.cer.transfiguratorLayersEnabled[3] = true
            },
            style() {
                let look = {width: "150px", minHeight: "100px", borderRadius: "0px 0px 5px 0px", color: "black"}
                if (player.cer.transfiguratorLayersEnabled[3]) {
                    look.background = "#ffdfef"
                } else if (this.canClick()) {
                    look.background = "#094599"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        /*101: {
            title() { return "(Active Path)<br><h1>SPARE CERE</h1><br>for now...<br><br>Unlock inverse singularities and boost checkback tickspeed by x1.3."},
            canClick() { return true},
            unlocked() { return true },
            onClick() {

            },
            style() {
                return {width: "300px", minHeight: "300px", borderRadius: "8px 0px 0px 8px", borderColor: "#ffffff", color: "black", background: "linear-gradient(-180deg, #ffffff 0%, #7f7f7f 100%)", fontSize: "12px"}
            },
        },
        102: {
            title() { return "(Idle Path)<br><h1>KILL CERE</h1><br><br>Unlock the reactor, more singularity point upgrades, and boost starmetal alloy by x2."},
            canClick() { return true},
            unlocked() { return true },
            onClick() {

            },
            style() {
                return {width: "300px", minHeight: "300px", borderRadius: "0px 8px 8px 0px", borderColor: "#ff0000", color: "white", background: "linear-gradient(-180deg, #ff0000 0%, #7f0000 100%)", fontSize: "12px"}
            },
        },*/
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Transfigurator": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                                ["raw-html", () => {
                                    if (!player.cer.cereUnlocked) return "???";
                                    if (player.cer.transfiguratorPower.lt(1)) return "Unpowered";
                                    return "Transfigurator Tier " + formatWhole(player.cer.transfiguratorPower) }, { "color": "white", "font-size": "24px", "font-family": "monospace" 
                                }],
                            ], {backgroundColor: "#5e2f47", borderRadius: "8px 8px 0px 0px", "border-bottom": "3px solid #ffdfef", width: "600px", "min-height": "50px"}
                        ],
                        ["blank", "25px"],
                        ["raw-html", () => { return formatWhole(player.in.infinities) + "/" + formatWhole(new Decimal(1e16).mul(new Decimal(100).pow(player.cer.transfiguratorPower))) + " infinities." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", () => { return formatWhole(player.cof.coreFragments[3]) + "/" + formatWhole(new Decimal(1e3).mul(new Decimal(4).pow(player.cer.transfiguratorPower))) + " paradox core fragments." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", () => {
                            if (player.cer.transfiguratorPower.lt(1)) return "";
                            return format(player.cer.abstractProduct) + "/" + formatWhole(new Decimal(1e12).mul(new Decimal(1e12).pow(player.cer.transfiguratorPower.pow(2))).div(1e12).sub(1)) + " abstract product." }, { "color": "white", "font-size": "24px", "font-family": "monospace" 
                        }],
                        ["blank", "25px"],
                        ["clickable", 1],
                    ], {backgroundColor: "#5e2f47", border: "3px solid #ffdfef", borderRadius: "8px", width: "600px"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                                ["raw-html", () => {return "Reboot is cooling down: 1h 0m 0s."}, { "color": "white", "font-size": "24px", "font-family": "monospace" 
                                }],
                                ["raw-html", () => {return "Abstract product is speeding up cooldown by x" + format(player.cer.rebootCooldownSpeed)}, { "color": "white", "font-size": "18px", "font-family": "monospace" 
                                }],
                            ], {backgroundColor: "#5e2f47", borderRadius: "8px 8px 0px 0px", "border-bottom": "3px solid #ffdfdf", width: "600px", "min-height": "75px"}
                        ],
                        ["clickable", 2],
                    ], {backgroundColor: "#5e2f47", border: "3px solid #ffdfef", borderRadius: "8px", width: "600px"}],
                ]
            },
            "Layers": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content() {
                    let content = [
                        ["blank", "25px"],
                        
                        ["style-column", [
                            ["style-column",
                                [
                                    ["raw-html", formatWhole(player.cer.transfiguratorPowerSpendable) + "/" + formatWhole(player.cer.transfiguratorPower) + " PWR", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                ], {borderRadius: "4px 0px 0px 0px", borderBottom: "3px solid #ffdfef", width: "100%", "min-height": "50px"}
                            ],

                            ["style-row", [
                                ["style-column", [
                                        ["raw-html", "Cere Points", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                        ["blank", "10px"],
                                        ["raw-html", "The most basic abstract SPV. Provides many all-around boosts.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                    ], {background: "linear-gradient(135deg, #666666 -50%, #804060 150%)", borderRadius: "0px 0px 0px 0px", width: "450px", "min-height": "100px"}
                                ],
                                ["clickable", 11],
                            ], {backgroundColor: "#5e2f47", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                        ], {backgroundColor: "#5e2f47", border: "3px solid #ffdfef", borderRadius: "8px", width: "600px", minHeight:"50px"}],

                        ["blank", "25px"],
                    ]
                    
                    if (player.cer.transfiguratorPowerBest.gte(2)) content[1][1].push(
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", "Exotic Matter", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["blank", "10px"],
                                    ["raw-html", "A weird form of antimatter. Pretty great for boosting other universes.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {background: "linear-gradient(135deg, #085c23 -50%, #804060 150%)", borderRadius: "0px 0px 0px 0px", width: "450px", "min-height": "100px"}
                            ],
                            ["clickable", 12],
                        ], {backgroundColor: "#5e2f47", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                    )
                    if (player.cer.transfiguratorPowerBest.gte(4)) content[1][1].push(
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", "Delta Rays", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["blank", "10px"],
                                    ["raw-html", "Rays produced when Cere's core absorbs SPVs. Incredibly powerful in this universe.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {background: "linear-gradient(135deg, #570000 -50%, #804060 150%)", borderRadius: "0px 0px 0px 0px", width: "450px", "min-height": "100px"}
                            ],
                            ["clickable", 13],
                            ], {backgroundColor: "#5e2f47", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                    )
                    if (player.cer.transfiguratorPowerBest.gte(5)) content[1][1].push(
                        ["style-row", [
                            ["style-column", [
                                    ["raw-html", "Delta Rays", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                    ["blank", "10px"],
                                    ["raw-html", "Rays produced when Cere's core absorbs SPVs. Incredibly powerful in this universe.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {background: "linear-gradient(135deg, #570000 -50%, #804060 150%)", borderRadius: "0px 0px 0px 0px", width: "450px", "min-height": "100px"}
                            ],
                            ["clickable", 13],
                        ], {backgroundColor: "#5e2f47", borderRadius: "0px 0px 0px 0px", width: "600px"}],
                    )

                    return content
                    
                }
            },
            /*"???": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["clickable", 101], ["clickable", 102],
                    ]]
                ]
            },*/
        }
    },
    tabFormat: [
        ["raw-html", () => { return player.cer.cereUnlocked ? "The product of your abstract values is <h3>" + format(player.cer.abstractProduct) + ".</h3>" : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.cer.cereUnlocked ? "Boosts negative infinity points by ^" + format(player.cer.abstractEffect) + "" : "" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true}
})