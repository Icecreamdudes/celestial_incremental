addLayer("ktb", {
    name: "The Knowledge Table",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,
        alchemicalSymbols: new Decimal (0),
        alchemicalSymbolsGain: new Decimal (0),
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #6b4423, #9b541a)",
            backgroundOrigin: "border-box",
            borderColor: "#F8C898",
            color: "#F8C898",
            borderRadius: "1px",
            transform: "translateY(-0px)"
        }
    },
    tooltip: "The Knowledge Table",
    color: "white",
    branches: ["tl"],

    update(delta) {
        let onepersec = new Decimal(1)

        // Start of Alchemical Symbol Gain
        player.ktb.alchemicalSymbolsGain = player.points.add(1).log10(player.points).div(100000)

        // Flooring Alchemical Symbol Gain
        player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.floor()

        // Start of KTB Multiplier Modifiers ?
        if (hasUpgrade("ktb", 201)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(2)
        if (hasUpgrade("ktb", 202)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 202))
    },

    // Alchemical Symbol Reset mechanism
    alchemicalSymbolsReset() {
        layers.co.singularityReset()

        player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.add(player.ktb.alchemicalSymbolsGain)
    },

    clickables: {
        1: {
            title() {return "<h3>Condense all of your Celestial Points into<br>🝪 Alchemical Symbols 🝪.<br> Requires: 1e100,000 Celestial Points</h3>"},
            canClick() {return player.ktb.alchemicalSymbolsGain.gte(1) & player.points.gte("1e100000")},
            unlocked() {return true},
            onClick() { 
                layers.ktb.alchemicalSymbolsReset()
             },
            style() {
            let look = {width: '500px', minHeight: '150px', maxHeight: "150px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'}
            if (this.canClick()) {
                look.background = "linear-gradient(0deg, #6B4423, #9b541a)"
                look.border = "3px solid #F8C898"
                look.color = "#F8C898"
            } else {
                look.backgroundColor = "#382413"
                look.border = "3px solid #97795b"
                look.color = "#97795b"
            }
            return look
            }}
        
    },

    bars: {},

    upgrades: {
        // Upgrades that affect the main progression of the Alchemy Universe.
        101: {
            title: "Symbol Transmutation",
            unlocked() {return true},
            description: "Unlocks Altered Alchemical Symbols and the Blueprint Table.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },
        102: {
            title: "Starmetal Alteration",
            unlocked() {return true},
            description: "Unlocks Altered Starmetal Alloy and Altered Starmetal Essence.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },
        103: {
            title: "Voidigenesis",
            unlocked() {return true},
            description: "Unlocks the blueprint for an Alchemical Node - Particle Accelerator.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },
        104: {
            title: "Alkahest Creation",
            unlocked() {return true},
            description: "Unlocks the ability to make the Alkahest.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },
        105: {
            title: "Aetherogenesis",
            unlocked() {return true},
            description: "Unlocks the blueprint for an Alchemical Node - Astrological Construct.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },
        106: {
            title: "Infernal Theory",
            unlocked() {return true},
            description: "Unlocks the ability to make the Inferno Element.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, magenta, #8b609c)"
                return look
            },
        },

        // Upgrades that affect the Knowledge Table progression ONLY.
        201: {
            title: "Doubled Knowledge",
            unlocked() {return true},
            description: "Double Alchemical Symbol gain.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
        },
        202: {
            title: "Powered Knowledge",
            unlocked() {return true},
            description: "Current Power boosts Alchemical Symbol gain.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            effect() {
                return player.ktb.alchemicalSymbolsGain.add(1).log10(player.hpw.power).add(1)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
            // please add here the effect, with formula Decimal.log(X).div(100).
        },
        203: {
            title: "Spatial Knowledge",
            unlocked() {return true},
            description: "Current Space Dust boosts Alchemical Symbol gain.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
            // please add here the effect
        },
        204: {
            title: "Temporal Knowledge",
            unlocked() {return true},
            description: "Current Temporal Dust boosts Alchemical Symbol gain.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
            // please add effect here
        },
        205: {
            title: "Accumulated Knowledge",
            unlocked() {return true},
            description: "Current Alchemical Symbol gain boosts itself.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
            // please add effect here
        },
        206: {
            title: "Novel Writing",
            unlocked() {return true},
            description: "Improves the Alchemical Symbol gain formula and unlocks the Tome Library.",
            cost: new Decimal(1),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)"
                return look
            },
            // please add effect here
        }
    },

    buyables: {},

    milestones: {},

    challenges: {},

    infoboxes: {},

    microtabs: {
        tabs: {
            "Upgrades": {
                buttonStyle() {return {color: "#F8C898", backgroundColor: "#6B4423", borderColor: "#F8C898", borderRadius: "5px"}},
                unlocked() {return true},
                content: [
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-column", [
                            ["top-column", [
                                ["blank", "15px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.ktb.alchemicalSymbols) + " 🝪 Alchemical Symbols 🝪. (+" + formatWhole(player.ktb.alchemicalSymbolsGain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "15px"],
                                ["clickable", 1],
                            ], {width: "700px", height: "235px", background: "linear-gradient(0deg, #382413, #523116)", borderTop: "3px solid #b18961", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #330033", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                            ["style-row", [
                                ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103]]],
                                ["row", [["upgrade", 104], ["upgrade", 105], ["upgrade", 106]]],
                            ], {width: "700px", height: "265px", background: "repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", borderLeft: "3px solid #330333", borderRight: "3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset"}],
                            ["style-row", [
                                ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203]]],
                                ["row", [["upgrade", 204], ["upgrade", 205], ["upgrade", 206]]],
                            ], {width: "700px", height: "265px", background: "linear-gradient(180deg, #382413, #523116)", borderTop: "3px solid #330033", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                            ]
                        ]]]
                ]}}
    },

    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.points) + "</h3> Celestial Points. (+" + formatWhole(player.gain) + "/s)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "tabs", {'border-width': '0px'}],
        ["blank", "10px"]
    ]
})
