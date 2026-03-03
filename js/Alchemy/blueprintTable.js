
// Add grid variables here
const symbolName =  [
                    "symbolStarmetalAlloy", "symbolStarmetalEssence", "symbolEclipseShard",
                    "symbolSpaceGem", "symbolSpaceDust", "symbolSpaceRock",
                    ]

addLayer("btb", {
    name: "The Blueprint Table",
    symbol: "▦",
    row: 2,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,

        selectedSymbolSMA: false,
        selectedSymbolSME: false,
        selectedSymbolECS: false,
        selectedSymbolSPG: false,
        selectedSymbolSPD: false,
        selectedSymbolSPR: false,

        symbolStarmetalAlloy: new Decimal(0),
        symbolStarmetalEssence: new Decimal(0),
        symbolSpaceRock: new Decimal(0),
        symbolSpaceGem: new Decimal(0),
        symbolSpaceDust: new Decimal(0),
        symbolEclipseShard: new Decimal(0)


            // advanced building materials, currently nothing as of now! Content will be added later!

    }},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)",
            backgroundOrigin: "border-box",
            borderColor: "white",
            color: "white",
            borderRadius: "0px",
            transform: "translateY(-0px)"
        }
    },
    tooltip: "The Blueprint Table",
    color: "white",
    branches: ["aal"],

    grid: { // working on it now
        rows: 5,
        cols: 5,
        getStartData(id) {
            if (id == undefined) return undefined
            let rac = id.toString().split("0") // Row and column format: [column, row]
            if (rac[0] != "1" & rac[0] != "5" & rac[1] != "1" & rac[1] != "5") { // check middle tiles only
                return 0 // unlocked
            } else {
                return -1 // locked
            }
        },
        getDisplay() {
            let str = ""
            if (data != 0 & data != -1) str = "<img src='resources/alchemyworld/symbolNone.png' style='width:40px;height:40px'></img>"
            return str
        },
        getStyle() {
            let look = {width: "50px", height: "50px", background: "#a2a2a2", border: "5px solid #777777", borderRadius: "0", padding: "0", margin: "3px", boxShadow: "0 0 2px 2px white, 0 0 5px 5px black"}
            return look
        }
    },

    clickables: {
        1: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>10000 Starmetal Alloy into<br>1 ⛯ Starmetal Alloy Symbol ⛯."},
            canClick() {return player.sma.starmetalAlloy.gte(100000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(10000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)"
                look.border = "3px solid #282363"
                look.color = "#282363"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        2: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>10000 Starmetal Essence into<br>1 ⚶ Starmetal Essence Symbol ⚶."},
            canClick() {return player.sme.starmetalEssence.gte(100000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.sme.starmetalEssence = player.sme.starmetalEssence.sub(10000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                look.border = "3px solid #282363"
                look.color = "#282363"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        3: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and <br>10 Eclipse Shards into<br>1 ⏾ Eclipse Shard Symbol ⏾."},
            canClick() {return player.sma.eclipseShards.gte(10) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.sma.eclipseShards = player.sma.eclipseShards.sub(10)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(135deg, #ffb700, #ffe866)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #222, #000) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        4: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>10 Space Gems into<br>1 ◈ Space Gem Symbol ◈."},
            canClick() {return player.ir.spaceGem.gte(10) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.ir.spaceGem = player.ir.spaceGem.sub(10)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #564BCC, #000000)"
                look.border = "3px solid white"
                look.color = "#eaf6f7"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        5: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>1000000 Space Dust into<br>1 ♄ Space Dust Symbol ♄."},
            canClick() {return player.pl.spaceDust.gte(1000000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.pl.spaceDust = player.pl.spaceDust.sub(1000000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)"
                look.border = "3px solid #59c2ff"
                look.color = "#eaf6f7"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        6: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>10000 Space Rocks into<br>1 ⛊ Space Rock Symbol ⛊."},
            canClick() {return player.ir.spaceRock.gte(100000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.add(1)
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10)
                player.ir.spaceRock = player.ir.spaceRock.sub(10000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)"
                look.border = "3px solid #464646"
                look.color = "#eaf6f7"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        7: {
            title() {return "Craft Alchemical Node Part"},
            canClick() {return false}, // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
            unlocked() {return true},
            onClick() { 
                // function here, it's supposed to subtract Altered AlSys from the pool and make the Alchemical Node Part.
                // Also unlocks Alchemy Altar.
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        8: {
            title() {return "Previous"},
            canClick() {return true}, // function here also
            unlocked() {return true},
            onClick() { 
                // function here
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        9: {
            title() {return "Next"},
            canClick() {return true}, // function here also
            unlocked() {return true},
            onClick() { 
                // function here
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },

        // start of crafting clickables
        11: {
            title() {return "Select"},
            canClick() {return player.btb.symbolStarmetalAlloy.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSMA) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = true,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        12: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSMA},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        21: {
            title() {return "Select"},
            canClick() {return player.btb.symbolStarmetalEssence.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSME) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = true,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        22: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSME},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        31: {
            title() {return "Select"},
            canClick() {return player.btb.symbolEclipseShard.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolECS) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = true,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        32: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolECS},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        41: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceGem.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPG) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = true,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        42: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPG},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        51: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceDust.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPD) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = true,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        52: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPD},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        61: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceRock.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPR) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = true
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        62: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPR},
            onClick() {
                player.btb.selectedSymbolSMA = false,
                player.btb.selectedSymbolSME = false,
                player.btb.selectedSymbolECS = false,
                player.btb.selectedSymbolSPG = false,
                player.btb.selectedSymbolSPD = false,
                player.btb.selectedSymbolSPR = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        tabs: {
            "Conversion I": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Alchemical Symbol Conversion Table"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                            ]
                        ]
                    ],
                    ["style-row",
                        [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalAlloy.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalAlloy)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Alloy Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalEssence.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalEssence)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Essence Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolEclipseShard.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolEclipseShard)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Eclipse Shard Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceGem.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceGem)}, {width: "90px", height: "50px", color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "20px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Gem Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceDust.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceDust)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Dust Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceRock.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceRock)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #c5c5c5 50%, #5f5f5f 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Rock Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                        ]
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["clickable", 1],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sma.starmetalAlloy) + " Starmetal Alloy."}, {color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 2],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sme.starmetalEssence) + " Starmetal Essence."}, {color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 3],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sma.eclipseShards) + " Eclipse Shards."}, {color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}]
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, white 21px, white 20px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 21px, #ffffff88 20px), radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
                        ["style-column",
                            [
                                ["clickable", 4],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceGem) + " Space Gems."}, {color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "16px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 5],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.pl.spaceDust) + " Space Dust."}, {color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 6],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceRock) + " Space Rocks."}, {color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)", fontSize: "16px", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, white 21px, white 20px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 21px, #ffffff88 20px), radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ]
                ]
            },
            "Crafting": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Crafting Table"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ],
                    ["style-row",
                        [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalAlloy.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalAlloy)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Alloy Symbols</div>"}],
                                ["clickable", 11],
                                ["clickable", 12]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalEssence.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalEssence)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Essence Symbols</div>"}],
                                ["clickable", 21],
                                ["clickable", 22]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolEclipseShard.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolEclipseShard)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Eclipse Shard Symbols</div>"}],
                                ["clickable", 31],
                                ["clickable", 32]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceGem.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceGem)}, {width: "90px", height: "50px", color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "20px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Gem Symbols</div>"}],
                                ["clickable", 41],
                                ["clickable", 42]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceDust.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceDust)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Dust Symbols</div>"}],
                                ["clickable", 51],
                                ["clickable", 52]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceRock.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceRock)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #c5c5c5 50%, #5f5f5f 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Rock Symbols</div>"}],
                                ["clickable", 61],
                                ["clickable", 62]
                            ], {width: "145px", height: "120px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                        ]
                    ],
                    ["style-row", [
                        ["style-column", // will be able to allow the player to change blueprints once blueprint switching is implemented.
                            [
                                ["raw-html", () => {
                                    if (hasUpgrade ("ktb", 101))
                                        return "<img src='resources/alchemyworld/blueprintAlchemicalNodeConverter.png'></img>"
                                }], 
                                ["blank", "5px"],
                                ["raw-html", () => {return "<h2>Alchemical Node<br>Part Blueprint</h2><br><small>(Used as a guide)</small>"}], // Name will change depending on blueprint image.
                                ["blank", "20px"],
                                ["style-row",
                                    [
                                        ["clickable", 8],
                                        ["blank", "20px"],
                                        ["clickable", 9]
                                    ]
                                ], {width: "447px", height: "0", marginLeft: "0"}
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, white 21px, white 20px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 21px, #ffffff88 20px), radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
                        ["style-column",
                            ["grid",
                            ["clickable", 7]
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, white 21px, white 20px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 21px, #ffffff88 20px), radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ]
                        ]
                    ]
                ]
            }
        }
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.ktb.alchemicalSymbols) + "</h3> 🝪 Alchemical Symbols 🝪. (+" + formatWhole(player.ktb.alchemicalSymbolsGain) + ")"}, {color: "transparent", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
        ["microtabs", "tabs", {'border-width': '0px'}],
        ["blank", "10px"],
    ],

    layerShown() { return player.startedGame == true && hasUpgrade("ktb", 101)},
},
)
