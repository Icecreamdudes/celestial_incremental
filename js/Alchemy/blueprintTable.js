
// Add grid variables here
const symbolName = [
                    "symbolNone",
                    "symbolStarmetalAlloy",
                    "symbolStarmetalEssence",
                    "symbolEclipseShard",
                    "symbolSpaceGem",
                    "symbolSpaceDust",
                    "symbolSpaceRock",
                    ];

const symbolBlueprint = [
                    "blueprintNone",
                    "blueprintAlchemicalNodeConverter",
                    "blueprintAlchemicalNodeCondenser",
                    "blueprintAlchemicalNodeGuider"
                    ];


addLayer("btb", {
    name: "The Blueprint Table",
    symbol: "▦",
    row: 2,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,

        selectedSymbolIndex: 0, // symbol select index
        selectedBlueprintIndex: 0, // blueprint select index
        
        selectedSymbolSMA: false,
        selectedSymbolSME: false,
        selectedSymbolECS: false,
        selectedSymbolSPG: false,
        selectedSymbolSPD: false,
        selectedSymbolSPR: false,

        craftedAlcNodePartConverter: false,
        alcNodePartConverter: new Decimal(0),

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

    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            if (id == undefined) return undefined
        },
        getDisplay(data) {
            let str = ""
            if (data != -1) str = "<img src='resources/alchemyworld/" + symbolName[data] + ".png' style='width:40px;height:40px'></img>"
            return str
        },
        onClick(data, id) {
            if (data != -1) {
                if (player.btb.selectedSymbolSMA == true || player.btb.selectedSymbolSME == true || player.btb.selectedSymbolECS == true || player.btb.selectedSymbolSPG == true || player.btb.selectedSymbolSPD == true || player.btb.selectedSymbolSPR == true) {
                    setGridData("btb", id, player.btb.selectedSymbolIndex)
                    player.btb.selectedSymbolIndex = 0;
                    player.btb.selectedSymbolSMA = false;
                    player.btb.selectedSymbolSME = false;
                    player.btb.selectedSymbolECS = false;
                    player.btb.selectedSymbolSPG = false;
                    player.btb.selectedSymbolSPD = false;
                    player.btb.selectedSymbolSPR = false
                } else {
                    player.btb.selectedSymbolIndex = 0;
                    setGridData("btb", id, 0)
                }
            }
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
                player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(1);
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(10000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)";
                look.border = "3px solid #282363";
                look.color = "#282363";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
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
                look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)";
                look.border = "3px solid #282363";
                look.color = "#282363";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
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
                player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.add(1);
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                player.sma.eclipseShards = player.sma.eclipseShards.sub(10)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(135deg, #ffb700, #ffe866)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #222, #000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
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
                player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.add(1);
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                player.ir.spaceGem = player.ir.spaceGem.sub(10)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #564BCC, #000000)";
                look.border = "3px solid white";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
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
                player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.add(1);
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                player.pl.spaceDust = player.pl.spaceDust.sub(1000000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)";
                look.border = "3px solid #59c2ff";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
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
                player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.add(1);
                player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                player.ir.spaceRock = player.ir.spaceRock.sub(10000)
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)";
                look.border = "3px solid #464646";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        7: {
            title() {return "Craft Alchemical Node Part"},
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                if (
                       getGridData("btb", 101) == 6 && getGridData("btb", 102) == 5 && getGridData("btb", 103) == 1 && getGridData("btb", 104) == 5 && getGridData("btb", 105) == 6
                    && getGridData("btb", 201) == 5 && getGridData("btb", 202) == 0 && getGridData("btb", 203) == 2 && getGridData("btb", 204) == 0 && getGridData("btb", 205) == 5
                    && getGridData("btb", 301) == 1 && getGridData("btb", 302) == 2 && getGridData("btb", 303) == 4 && getGridData("btb", 304) == 2 && getGridData("btb", 305) == 1
                    && getGridData("btb", 401) == 5 && getGridData("btb", 402) == 0 && getGridData("btb", 403) == 2 && getGridData("btb", 404) == 0 && getGridData("btb", 405) == 5
                    && getGridData("btb", 501) == 6 && getGridData("btb", 502) == 5 && getGridData("btb", 503) == 1 && getGridData("btb", 504) == 5 && getGridData("btb", 505) == 6
                    && player.btb.symbolStarmetalAlloy.gte(4)
                    && player.btb.symbolStarmetalEssence.gte(4)
                    && player.btb.symbolSpaceGem.gte(1)
                    && player.btb.symbolSpaceDust.gte(8)
                    && player.btb.symbolSpaceRock.gte(4)
                ) {
                    craftedAlcNodePartConverter = true;
                    return true 
                } else {
                    return false
                }
            }, 
            unlocked() {return true},
            onClick() { 
                if (craftedAlcNodePartConverter = true)
                        {
                        player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.sub(4);
                        player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(4);
                        player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.sub(1);
                        player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(8);
                        player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(4);
                        player.btb.alcNodePartConverter = player.btb.alcNodePartConverter.add(1)}

                if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                        if (craftedAlcNodePartConverter = true) {
                        setGridData("btb", i, 0);
                        craftedAlcNodePartConverter = false
                        }
                    };

                    // Increase i value
                    if (i % 5 == 0) {
                        i = i+96
                    } else {
                        i++
                    }
                    }
                
                }
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        8: {
            title() {return "Previous"},
            canClick() {return true}, // function here also
            unlocked() {return player.btb.alcNodePartConverter.gte(4)},
            onClick() { 
                player.btb.selectedBlueprintIndex = player.btb.selectedBlueprintIndex.sub(1)
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        9: {
            title() {return "Next"},
            canClick() {return true}, // function here also
            unlocked() {return player.btb.alcNodePartConverter.gte(4)},
            onClick() { 
                player.btb.selectedBlueprintIndex = player.btb.selectedBlueprintIndex.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        10: {
            title() {return "Clear Grid"},
            canClick() {return true},
            unlocked() {return true},
            onClick() { 
               
            if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                        setGridData("btb", i, 0)
                    } 
                    // Increase i value
                    if (i % 5 == 0) {
                        i = i+96
                    } else {
                        i++
                    }
                }
                if (player.btb.selectedSymbolSMA == true || player.btb.selectedSymbolSME == true || player.btb.selectedSymbolECS == true || player.btb.selectedSymbolSPG == true || player.btb.selectedSymbolSPD == true || player.btb.selectedSymbolSPR == true) {
                    player.btb.selectedSymbolSMA = false;
                    player.btb.selectedSymbolSME = false;
                    player.btb.selectedSymbolECS = false;
                    player.btb.selectedSymbolSPG = false;
                    player.btb.selectedSymbolSPD = false;
                    player.btb.selectedSymbolSPR = false;
                    player.btb.selectedSymbolIndex = 0;
                    setgridData("btb", id, 0)
                }

            }      
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginBottom: "10px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
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
                player.btb.selectedSymbolIndex = 1;
                player.btb.selectedSymbolSMA = true;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 2;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = true;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 3;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = true;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 4;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = true;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 5;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = true;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 6;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
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
                                // come back to this later
                                ["raw-html", () => {return "<img src='resources/alchemyworld/" + symbolBlueprint[1] + ".png'></img>"}], 


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
                            [
                                ["clickable", 10],
                                "grid",
                                ["clickable", 7]
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, white 21px, white 20px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 21px, #ffffff88 20px), radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ]
                        ]
                    ]
                ]
            },
            "Node Storage": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return player.btb.alcNodePartConverter.gte(1) },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Node Storage"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["raw-html", () => {return "You have " + formatWhole(player.btb.alcNodePartConverter) + " Alchemical Node Converters."}, {color: "transparent", background: "white", fontSize: "20px", textStroke: "1px #cccccc", 'text-shadow': "0 0 5px black", backgroundClip: "text", fontFamily: "monospace"}],
                            ], {width: "900px", height: "500px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
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
