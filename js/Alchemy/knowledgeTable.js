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
        alchemicalSymbolsMult: new Decimal (1)
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #6b4423, #9b541a)",
            backgroundOrigin: "border-box",
            borderColor: "#F8C898",
            color: "#F8C898",
            borderRadius: "1px",
            transform: "translateY(-0px)",
        }
    },
    tooltip: "The Knowledge Table",
    branches: ["tl", "btb", "aal"],
    color: "white",

    update(delta) {

        // Start of Alchemical Symbol Gain
        player.ktb.alchemicalSymbolsGain = player.points.add(1).log10(player.points).div(100000)

        // Flooring Alchemical Symbol Gain
        player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.floor()

        // Start of KTB Multiplier Modifiers ?
        if (hasUpgrade("ktb", 201)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(3)
        if (hasUpgrade("ktb", 202)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 202))
        if (hasUpgrade("ktb", 203)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 203))
        if (hasUpgrade("ktb", 204)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 204))
        if (hasUpgrade("ktb", 205)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 205))
        if (hasUpgrade("ktb", 210)) player.ktb.alchemicalSymbolsGain = player.ktb.alchemicalSymbolsGain.mul(upgradeEffect("ktb", 205))
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
            let look = {width: '500px', minHeight: '150px', maxHeight: "150px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '45px'}
            if (this.canClick()) {
                look.background = "linear-gradient(0deg, #6B4423, #9b541a)"
                look.border = "3px solid #F8C898"
                look.color = "#F8C898"
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#382413"
                look.border = "3px solid #97795b"
                look.color = "#97795b"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }}
        
    },

    bars: {},

    upgrades: {
        // Upgrades that affect the main progression of the Alchemy Universe.
        101: {
            title: "Symbol Conversion",
            unlocked() {return true},
            description: "Unlocks Altered Alchemical Symbols and the Blueprint Table.",
            cost: new Decimal(50),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        102: {
            title: "Starmetal Alteration",
            unlocked() {return hasUpgrade("ktb", 101)},
            description: "Unlocks Altered Starmetal Alloy and Altered Starmetal Essence.",
            cost: new Decimal(300),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        103: {
            title: "Voidigenesis",
            unlocked() {return hasUpgrade("ktb", 102)},
            description: "Unlocks the Particle Accelerator blueprint and the Void Element.",
            cost: new Decimal(750),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        104: {
            title: "Alkahest Creation",
            unlocked() {return hasUpgrade("ktb", 103)},
            description: "Unlocks the Nexus of Unification blueprint and the Alkahest Element.",
            cost: new Decimal(2000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        105: {
            title: "Aetherogenesis",
            unlocked() {return hasUpgrade("ktb", 104)},
            description: "Unlocks the Astrological Construct blueprint and the Aether Element.",
            cost: new Decimal(4000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        106: {
            title: "Infernal Theory",
            unlocked() {return hasUpgrade("ktb", 105)},
            description: "Unlocks the Plasma Chamber blueprint and the Inferno Element.",
            cost: new Decimal(8000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        107: {
            title: "Equinox Reverie",
            unlocked() {return hasUpgrade("ktb", 106)},
            description: "Unlocks the Illusionary Mirror blueprint and the Light and Darkness Elements.",
            cost: new Decimal(16000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        108: {
            title: "Sakura Revelation",
            unlocked() {return hasUpgrade("ktb", 107)},
            description: "Unlocks the Dimension Slicer blueprint and the Space and Time Elements.",
            cost: new Decimal(32000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        109: {
            title: "Higher Order Elements",
            unlocked() {return hasUpgrade("ktb", 108)},
            description: "Unlocks the higher order elements and their machines' blueprints.",
            cost: new Decimal(64000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)", look.borderColor = "transparent", look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        110: {
            title: "Prismatic World",
            unlocked() {return hasUpgrade("ktb", 210)},
            description: "Unlocks the Spire of the ██████.<br>(coming Soon!)",
            cost: new Decimal(100000000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "conic-gradient( #ff9999, #ffff99, #99ff99, #99ffff, #9999ff, #ff99ff, #ff9999 100%)", look.borderColor = "transparent", look.borderImage = "conic-gradient( #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000 100%) 1", look.borderRadius = "1px", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },

        // Upgrades that affect the Knowledge Table progression ONLY.
        201: {
            title: "Heightened Practice",
            unlocked() {return true},
            description: "Triple base AlSy gain.",
            cost: new Decimal(200),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        202: {
            title: "Symbol of Strength",
            unlocked() {return true},
            description: "Boosts AlSy gain based on total power.",
            cost: new Decimal(500),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            effect() {
                return player.ktb.alchemicalSymbolsMult.add(Decimal.log10(player.hpw.totalPower)).div(10)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        203: {
            title: "Symbol of Courage",
            unlocked() {return true},
            description: "Boosts AlSy gain based on stars.",
            cost: new Decimal(1000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            effect() {
                return player.ktb.alchemicalSymbolsMult.add(Decimal.log10(player.au2.stars)).div(10)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            }
        },
        204: {
            title: "Symbol of Wisdom",
            unlocked() {return true},
            description: "Boosts AlSy gain based on highest CB Level.",
            cost: new Decimal(3500),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            effect() {
                return player.ktb.alchemicalSymbolsMult.add(Decimal.log10(player.cb.highestLevel)).div(2)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            }
        },
        205: {
            title: "Page Accumulation",
            unlocked() {return true},
            description: "Boosts AlSy gain based on itself.",
            cost: new Decimal(5000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            effect() {
                return player.ktb.alchemicalSymbolsMult.add(Decimal.log10(player.ktb.alchemicalSymbols)).div(2).add(1)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            }
        },
        206: {
            title: "Symbol of the Wonders",
            unlocked() {return hasUpgrade("ktb", 109)},
            description: "Unlocks the Alchemical Symbol Gatherer.",
            cost: new Decimal(100000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        207: {
            title: "Symbol of the Gifts",
            unlocked() {return hasUpgrade("ktb", 109)},
            description: "Starmetal Alteration rates are 100% more effective.",
            cost: new Decimal(100000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        208: {
            title: "Symbol of the Signs",
            unlocked() {return hasUpgrade("ktb", 109)},
            description: "Divides the Alchemical Reaction times by 2.",
            cost: new Decimal(100000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        209: {
            title: "Symbol of the Miracles",
            unlocked() {return hasUpgrade("ktb", 109)},
            description: "1st Order Alchemical Reactions are 100% more effective.",
            cost: new Decimal(100000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        },
        210: {
            title: "Novel Writing",
            unlocked() {return hasUpgrade("ktb", 206) && hasUpgrade("ktb", 207) && hasUpgrade("ktb", 208) && hasUpgrade("ktb", 209)},
            description: "Improves the AlSy gain formula and unlocks the Tome Library.",
            cost: new Decimal(1000000),
            currencyLocation() {return player.ktb},
            currencyDisplayName: "Alchemical Symbols",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "1px", margin: "4px"}
                hasUpgrade(this.layer, this.id) ? lookBackground = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? lookBackground = "#bf8f8f" : look.background = "linear-gradient(0deg, #6b4423, #9b541a)", look.borderColor = "#F8C898", look.boxShadow = "0 0 3px 1px black inset"
                return look
            },
        }
    },

    buyables: {},

    milestones: {},

    challenges: {},

    infoboxes: {
    1: {
            title: "Alchemical Symbols",
            body() { return "The Alchemical Symbols... ahh. What an interesting superphysical value type. They are made up of Celestial Points, the very same starting resource that constitutes the Overworld. Louki has found a way to utilize the Celestial Points to her benefit. By using her weakened alchemical magic, she is able to condense extremely large Celestial Point counts into Alchemical Symbols. With the Alchemical Symbols roaming around her world, she binds them to her empty pages to store information. I did not know that such powerful magic can exist here. Maybe I should talk to Louki often to find out more" },
            unlocked() { return true },
    },
    2: {
            title: "Alchemical Nodes",
            body() { return "???" },
            unlocked() { return true },
    },
    3: {
            title: "Basic Alchemical Elements",
            body() { return "???" },
            unlocked() { return true },
    },
    4: {
            title: "The Void Element, Elusive",
            body() { return "???" },
            unlocked() { return true },
    },
    5: {
            title: "The Alkahest Element, Explosive",
            body() { return "???" },
            unlocked() { return true },
    },
    6: {
            title: "The Aether Element, Forgotten",
            body() { return "???" },
            unlocked() { return true },
    },
    7: {
            title: "The Inferno Element, Cursed",
            body() { return "???" },
            unlocked() { return true },
    },
    8: {
            title: "The Equinox Reverie Incident",
            body() { return "???" },
            unlocked() { return true },
    },
    9: {
            title: "The Sakura Revelation Incident",
            body() { return "???" },
            unlocked() { return true },
    },
    10: {
            title: "The Crimson Eternity Incident",
            body() { return "???" },
            unlocked() { return true },
    },
    },

    microtabs: {
        tabs: {
            "Upgrades": {
                buttonStyle() {return {color: "#F8C898", backgroundColor: "#6B4423", backgroundImage: "linear-gradient(0deg, #6B4423, #9b541a)", borderColor: "#F8C898", borderRadius: "1px", boxShadow: "0 0 3px 1px black inset"}},
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
                                ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104], ["upgrade", 105]]],
                                ["row", [["upgrade", 106], ["upgrade", 107], ["upgrade", 108], ["upgrade", 109], ["upgrade", 110]]],
                            ], {width: "700px", height: "265px", background: "repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", borderLeft: "3px solid #330333", borderRight: "3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset"}],
                            ["style-row", [
                                ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203], ["upgrade", 204], ["upgrade", 205]]],
                                ["row", [["upgrade", 206], ["upgrade", 207], ["upgrade", 208], ["upgrade", 209], ["upgrade", 210]]],
                            ], {width: "700px", height: "265px", background: "linear-gradient(180deg, #382413, #523116)", borderTop: "3px solid #330033", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]]
                            ]
                        ]
                    ]
                ]
            },
            "Lore": {
                buttonStyle() {return {color: "black", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", borderColor: "transparent", borderImage: "linear-gradient(to bottom, chartreuse, #00ff9d) 1", borderRadius: "1px", boxShadow: "0 0 3px 1px black inset"}},
                unlocked() { return true},
                content: [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                    ["infobox", "4"],
                    ["infobox", "5"],
                    ["infobox", "6"],
                    ["infobox", "7"],
                    ["infobox", "8"],
                    ["infobox", "9"],
                    ["infobox", "10"],
                ]
            }
            },
    },

    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.points) + "</h3> Celestial Points. (+" + formatWhole(player.gain) + "/s)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "tabs", {'border-width': '0px'}],
        ["blank", "10px"]
    ],
})