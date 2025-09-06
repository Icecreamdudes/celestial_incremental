addLayer("pu", {
    name: "Punchcards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PU", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        selectedPunchcards: [0, 0, 0],
        storedSelections: new Decimal(0),
        selectionIndex: 0,
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #1a2f78 0%, #2a79ad 50%, #4cc1c7 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#8ca3ff",
            color: "#f5f7ff",
        };
    },
    tooltip: "Punchcards",
    color: "black",
    update(delta) {},
    generateSelection() {
        player.pu.selectedPunchcards = [0, 0, 0]
        let raritySelect = [[], [], []]
        for (let prop in player.pu.levelables) {
            if (run(layers.pu.levelables[prop].canSelect, layers.pu.levelables[prop]) && !getLevelableBool("pu", prop)) {
                if (prop >= 100 && prop < 200) raritySelect[0].push(prop) // COMMON
                if (prop >= 200 && prop < 300) raritySelect[1].push(prop) // RARE
                if (prop >= 300 && prop < 400) raritySelect[2].push(prop) // EPIC
            }
        }
        for (let i = 0; i < 3; i++) {
            let rng = Math.random()
            let rarity = -1

            // ROLL FOR IF NON-COMMON
            if (rng < 0.1 && raritySelect[2].length > 0) rarity = 2 // EPIC
            if (rng >= 0.1 && rng < 0.35 && raritySelect[1].length > 0) rarity = 1 // RARE

            // ROLL FAILED, TRY TO PICK RARITIES IN A ROW STARTING WITH COMMON
            for (let j = 0; j < raritySelect.length; j++) {
                if (rarity == -1 && raritySelect[j].length > 0) rarity = j
            }

            // IF ALL THOSE FAILED, ITERATE
            if (rarity == -1) continue

            // CHOOSE CHOICE FROM PICKED RARITY, AND REMOVE FROM RARITY SELECT
            let choice = Math.floor(Math.random() * raritySelect[rarity].length)
            player.pu.selectedPunchcards[i] = raritySelect[rarity][choice]
            raritySelect[rarity].splice(choice, 1)
        }
    },
    clickables: {
        1: {
            title() {return layers.pu.levelables.index != 0 ? "Level Up" : ""},
            canClick() {return getLevelableXP("pu", layers.pu.levelables.index).gte(tmp.pu.levelables[layers.pu.levelables.index].xpReq) && layers.pu.levelables.index != 0},
            unlocked() {return true},
            onClick() {
                addLevelableXP("pu", layers.pu.levelables.index, tmp.pu.levelables[layers.pu.levelables.index].xpReq.neg())
                addLevelables("pu", layers.pu.levelables.index, 1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "425px", minHeight: "40px", color: "white", fontSize: "12px", borderRadius: "0px"}
                layers.pu.levelables.index == 0 ? look.backgroundColor =  "#0e1019" : !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#384166"
                if (layers.pu.levelables.index == 0) look.cursor = "default"
                return look
            }
        },
        2: {
            title: "Selection",
            canClick() {return player.subtabs.pu["stuff"] != "Selection"},
            unlocked() {return player.sma.inStarmetalChallenge},
            onClick() {
                player.subtabs.pu["stuff"] = "Selection"
            },
            style() {
                let look = {width: "273px", minHeight: "40px", fontSize: "12px", color: "white", borderRadius: "0px"}
                if (this.canClick()) {look.backgroundColor = "#384166"} else {look.backgroundColor = "#0e1019"}
                return look
            },
        },
        3: {
            title: "Collection",
            canClick() {return player.subtabs.pu["stuff"] != "Collection"},
            unlocked: true,
            onClick() {
                player.subtabs.pu["stuff"] = "Collection"
            },
            style() {
                let look = {width: "274px", minHeight: "40px", fontSize: "12px", color: "white", borderRadius: "0px"}
                if (!player.sma.inStarmetalChallenge) look.width = "550px"
                if (this.canClick()) {look.backgroundColor = "#384166"} else {look.backgroundColor = "#0e1019"}
                return look
            },
        },

        10: {
            title() { return "Activate this card" },
            canClick() { return player.pu.storedSelections.gte(1) && player.pu.selectedPunchcards[player.pu.selectionIndex] != 0},
            unlocked: true,
            onClick() {
                setLevelableBool("pu", player.pu.selectedPunchcards[player.pu.selectionIndex], true)
                player.pu.storedSelections = player.pu.storedSelections.sub(1)

                layers.pu.generateSelection();
            },
            style() {
                let look = {width: "200px", minHeight: "50px", color: "white", border: "2px solid #384166", borderRadius: "10px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
        11: {
            title() {
                let val = player.pu.selectedPunchcards[0]
                if (player.pu.storedSelections.lt(1)) val = 0
                let str = "<img src='resources/Punchcards/"
                if (val >= 100 && val < 200) {
                    str = str.concat("commonPunchcard" + (val - 100))
                } else if (val >= 200 && val < 300) {
                    str = str.concat("rarePunchcard" + (val - 200))
                } else if (val >= 300 && val < 400) {
                    str = str.concat("epicPunchcard" + (val - 300))
                } else {
                    str = str.concat("lockedPunchcard")
                }
                return str.concat(".png'style='width:69px;height:119px'></img>")
            },
            canClick() { return player.pu.storedSelections.gte(1) && player.pu.selectedPunchcards[0] != 0 },
            unlocked: true,
            onClick() {
                player.pu.selectionIndex = 0
            },
            style() {
                let look = {width: "75px", height: "125px", border: "3px solid", padding: "0px", borderRadius: "0px", margin: "5px"}
                if (player.pu.selectionIndex == 0 && player.pu.storedSelections.gte(1)) {look.borderColor = "white"} else {look.borderColor = "#444"}
                return look
            },
        },
        12: {
            title() {
                let val = player.pu.selectedPunchcards[1]
                if (player.pu.storedSelections.lt(1)) val = 0
                let str = "<img src='resources/Punchcards/"
                if (val >= 100 && val < 200) {
                    str = str.concat("commonPunchcard" + (val - 100))
                } else if (val >= 200 && val < 300) {
                    str = str.concat("rarePunchcard" + (val - 200))
                } else if (val >= 300 && val < 400) {
                    str = str.concat("epicPunchcard" + (val - 300))
                } else {
                    str = str.concat("lockedPunchcard")
                }
                return str.concat(".png'style='width:69px;height:119px'></img>")
            },
            canClick() { return player.pu.storedSelections.gte(1) && player.pu.selectedPunchcards[1] != 0 },
            unlocked: true,
            onClick() {
                player.pu.selectionIndex = 1
            },
            style() {
                let look = {width: "75px", height: "125px", border: "3px solid", padding: "0px", borderRadius: "0px", margin: "5px"}
                if (player.pu.selectionIndex == 1 && player.pu.storedSelections.gte(1)) {look.borderColor = "white"} else {look.borderColor = "#444"}
                return look
            },
        },
        13: {
            title() {
                let val = player.pu.selectedPunchcards[2]
                if (player.pu.storedSelections.lt(1)) val = 0
                let str = "<img src='resources/Punchcards/"
                if (val >= 100 && val < 200) {
                    str = str.concat("commonPunchcard" + (val - 100))
                } else if (val >= 200 && val < 300) {
                    str = str.concat("rarePunchcard" + (val - 200))
                } else if (val >= 300 && val < 400) {
                    str = str.concat("epicPunchcard" + (val - 300))
                } else {
                    str = str.concat("lockedPunchcard")
                }
                return str.concat(".png'style='width:69px;height:119px'></img>")
            },
            canClick() { return player.pu.storedSelections.gte(1) && player.pu.selectedPunchcards[2] != 0 },
            unlocked: true,
            onClick() {
                player.pu.selectionIndex = 2
            },
            style() {
                let look = {width: "75px", height: "125px", border: "3px solid", padding: "0px", borderRadius: "0px", margin: "5px"}
                if (player.pu.selectionIndex == 2 && player.pu.storedSelections.gte(1)) {look.borderColor = "white"} else {look.borderColor = "#444"}
                return look
            },
        },
    },
    levelables: {
        0: {
            image() { return "resources/Punchcards/lockedPunchcard.png"},
            title() { return "No Punchcard Selected." },
            description() { return "" },
            canSelect: false,
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() { return {width: '80px', height: '152px', backgroundColor: '#222222'} } 
        },
        101: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Points based on Points"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to points <small>(Based on points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to infinity points",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.du.points.pow(0.1).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(1000, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(30, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e30)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        102: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Prestige based on Prestige"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "Unlock a new prestige buyable<br>",
                    "x" + format(this.effect()[0]) + " to prestige points <small>(Based on prestige points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to negative infinity points",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dp.prestigePoints.pow(0.2).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(100, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(10, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e20)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        103: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Rank Amplifier"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "^" + format(this.effect()[0].div(1.08)) + " to rank effect<br>",
                    "x" + format(this.effect()[1]) + " to rank points <small>(Based on points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[2]) + " to anonymity",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1), new Decimal(1)]
                eff[0] = this.effectScale().mul(0.5).add(1)
                eff[1] = player.du.points.pow(0.1).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[2] = Decimal.pow(30, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[2] = Decimal.pow(5, getLevelableAmount(this.layer, this.id).sub(10)).mul(5.9e14)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        104: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Tier Amplifier"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "^" + format(this.effect()[0].div(1.15)) + " to tier effect<br>",
                    "x" + format(this.effect()[1]) + " to tier points <small>(Based on points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[2]) + " to oil",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1), new Decimal(1)]
                eff[0] = this.effectScale().mul(0.6).add(1)
                eff[1] = player.du.points.pow(0.2).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[2] = Decimal.pow(10, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[2] = Decimal.pow(3, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e10)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        105: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Tetr Amplifier"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "^" + format(this.effect()[0].div(1.2)) + " to tetr effect<br>",
                    "x" + format(this.effect()[1]) + " to tetr points <small>(Based on points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[2]) + " to charge",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1), new Decimal(1)]
                eff[0] = this.effectScale().mul(0.7).add(1)
                eff[1] = player.du.points.pow(0.4).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[2] = Decimal.pow(50, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[2] = Decimal.pow(7, getLevelableAmount(this.layer, this.id).sub(10)).mul(9.77e16)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        106: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "<small>Generators based on Generators</small>"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to generators <small>(Based on generators)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to dice points and rocket fuel",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dg.generators.pow(0.2).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(400, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(20, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e26)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(3) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(3)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        107: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "<small>Gen-Power based on Gen-Power</small>"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to gen-power <small>(Based on gen-power)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to pre-hex power resources",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dg.generatorPower.pow(0.25).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.5).add(6)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(3) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(3)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        108: {
            image() {return this.canClick() ? "resources/Punchcards/commonPunchcard8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Grass based on Grass"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to grass cap and value <small>(Based on grass)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to golden grass",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dgr.grass.pow(0.2).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(4, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(10)).mul(1048576)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(4) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(4)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).mul(10).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(9)).mul(364.83).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },

        201: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Point Softcap Weakener"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "^" + format(this.effect()[0]) + " to point softcap<br>",
                    "/" + format(this.effect()[1]) + " to point softcap <small>(Based on point softcap)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "/" + format(this.effect()[2]) + " to check back xp button cooldowns",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.pow(0.7, this.effectScale())
                eff[1] = player.du.pointSoftcap.pow(0.08).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[2] = getLevelableAmount(this.layer, this.id).mul(0.02).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[2] = getLevelableAmount(this.layer, this.id).mul(0.01).add(1.1)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        202: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Rank/Tier/Tetr Amplifier"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "^" + format(this.effect()[0]) + " to rank/tier/tetr effect<br>",
                    "x" + format(this.effect()[1]) + " to rank/tier/tetr points <small>(Based on points)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[2]) + " to check back xp",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1), new Decimal(1)]
                eff[0] = this.effectScale().mul(0.1).add(1)
                eff[1] = player.du.points.pow(0.08).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[2] = getLevelableAmount(this.layer, this.id).mul(0.06).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[2] = getLevelableAmount(this.layer, this.id).mul(0.03).add(1.3)
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        203: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Points based on Generators"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to points <small>(Based on generators)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to hex power",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dg.generators.pow(0.6).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.2).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.1).add(2)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(3) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(3)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        204: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Prestige based on Generators"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to prestige points <small>(Based on generators)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to core scraps",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dg.generators.pow(0.4).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.4).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.2).add(3)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(3) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(3)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        205: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Grass based on Generators"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to grass cap and value <small>(Based on generators)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to moonstone",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dg.generators.pow(0.15).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.3).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.15).add(2.5)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(4) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(4)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        206: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Grass based on Prestige"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "Unlock a new prestige buyable",
                    "x" + format(this.effect()[0]) + " to grass cap and value <small>(Based on prestige)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to pollinators",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.dp.prestigePoints.pow(0.1).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(4, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(2, getLevelableAmount(this.layer, this.id).sub(10)).mul(1048576)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(4) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(4)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        207: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Pent"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "Unlock pent in rank layer<br>",
                    "^" + format(this.effect()[0]) + " to pent effect<br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to time cubes",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = this.effectScale().mul(0.3).add(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(100, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(30, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e20)
                return eff
            },
            // CLICK CODE
            unlocked() {return player.le.highestReset.gte(5) || this.canClick()},
            canSelect() {return player.le.resetAmount.gte(5)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        208: {
            image() {return this.canClick() ? "resources/Punchcards/rarePunchcard8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Booster"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "/" + format(this.effect()[0]) + " to booster requirement <small>(Based on boosters)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to stars",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.db.boosters.pow(2.5).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.05).add(1.5)
                return eff
            },
            // CLICK CODE
            unlocked() {return (player.pet.activeAbilities[0] && player.le.highestReset.gte(3)) || this.canClick()},
            canSelect() {return player.pet.activeAbilities[0] && player.le.resetAmount.gte(3)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).mul(25).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.25, getLevelableAmount(this.layer, this.id).sub(9)).mul(1159.23).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#7f5f00" : look.backgroundColor = "#3f2f00"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },

        301: {
            image() {return this.canClick() ? "resources/Punchcards/epicPunchcard1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Multipurpose I"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to points and rank/prestige/generator/grass<br>layer currencies <small>(Based on starmetal alloy)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to pre-otf currencies",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                if (player.sma.starmetalAlloy.lt(100000)) eff[0] = player.sma.starmetalAlloy.add(1).pow(0.8).pow(this.effectScale())
                if (player.sma.starmetalAlloy.gte(100000)) eff[0] = player.sma.starmetalAlloy.div(100000).pow(0.2).mul(10000).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = Decimal.pow(10, getLevelableAmount(this.layer, this.id))
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = Decimal.pow(3, getLevelableAmount(this.layer, this.id).sub(10)).mul(1e10)
                return eff
            },
            // CLICK CODE
            unlocked() {return hasUpgrade("sma", 17) || this.canClick()},
            canSelect() {return hasUpgrade("sma", 17)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).mul(75).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.5, getLevelableAmount(this.layer, this.id).sub(9)).mul(4420.07).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#003f7f" : look.backgroundColor = "#00254c"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        302: {
            image() {return this.canClick() ? "resources/Punchcards/epicPunchcard2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Matos"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to starmetal alloy<br><small>(Based on universe resets)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to starmetal alloy",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.05).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.0125).add(1.4)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.005).add(2).min(2.5)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.le.resetAmount.div(5).add(1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.2).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.1).add(2)
                return eff
            },
            // CLICK CODE
            unlocked() {return hasUpgrade("sma", 17) || this.canClick()},
            canSelect() {return hasUpgrade("sma", 17)},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).mul(75).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.5, getLevelableAmount(this.layer, this.id).sub(9)).mul(4420.07).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#003f7f" : look.backgroundColor = "#00254c"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        303: {
            image() {return this.canClick() ? "resources/Punchcards/epicPunchcard3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Time"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "/" + format(this.effect()[0]) + " to eclipse timer tickspeed<br><small>(Based on universe resets)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to eclipse's effect duration",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.75)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.01).add(3).min(4)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.le.resetAmount.add(1).pow(0.15).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.1).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.05).add(1.5)
                return eff
            },
            // CLICK CODE
            unlocked() {return (hasUpgrade("sma", 17) && player.pet.activeAbilities[0]) || this.canClick()},
            canSelect() {return hasUpgrade("sma", 17) && player.pet.activeAbilities[0]},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).mul(75).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.5, getLevelableAmount(this.layer, this.id).sub(9)).mul(4420.07).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#003f7f" : look.backgroundColor = "#00254c"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        304: {
            image() {return this.canClick() ? "resources/Punchcards/epicPunchcard4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                let str = "Eclipse"
                if (getLevelableBool(this.layer, this.id)) {str = str.concat("<small> [ACTIVE]</small>")} else {str = str.concat("<small style='color:gray'> [INACTIVE]</small>")}
                return str
            },
            description() {
                let str = [
                    !getLevelableBool(this.layer, this.id) ? "<span style='color:gray'>" : "",
                    "<u>Active</u><br>",
                    "x" + format(this.effect()[0]) + " to eclipse shards<br><small>(Based on universe resets)</small><br>",
                    !getLevelableBool(this.layer, this.id) ? "</span>" : "",
                    "<u>Passive</u><br>",
                    "x" + format(this.effect()[1]) + " to eclipse shards",
                    getLevelableAmount(this.layer, this.id).gte(10) ? "<br><small style='color:darkred'>[EFFECTS SOFTCAPPED]</small>" : "",
                ]
                return str.join("")
            },
            effectScale() {
                let scale = new Decimal(1)
                if (getLevelableAmount(this.layer, this.id).lt(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.05).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) scale = getLevelableAmount(this.layer, this.id).mul(0.0125).add(1.4)
                if (getLevelableAmount(this.layer, this.id).gte(50)) scale = getLevelableAmount(this.layer, this.id).sub(49).log(2).mul(0.005).add(2).min(2.5)
                return scale
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = player.le.resetAmount.add(1).pow(0.1).pow(this.effectScale())
                if (getLevelableAmount(this.layer, this.id).lt(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.05).add(1)
                if (getLevelableAmount(this.layer, this.id).gte(10)) eff[1] = getLevelableAmount(this.layer, this.id).mul(0.025).add(1.25)
                return eff
            },
            // CLICK CODE
            unlocked() {return (hasUpgrade("sma", 17) && player.pet.activeAbilities[0]) || this.canClick()},
            canSelect() {return hasUpgrade("sma", 17) && player.pet.activeAbilities[0]},
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableBool(this.layer, this.id)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).mul(75).floor()
                if (getLevelableAmount(this.layer, this.id).gte(10)) return Decimal.pow(2.5, getLevelableAmount(this.layer, this.id).sub(9)).mul(4420.07).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableBool(this.layer, this.id) ? look.backgroundColor = "#003f7f" : look.backgroundColor = "#00254c"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
    },
    microtabs: {
        stuff: {
            "Selection": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {
                                    if (player.pu.storedSelections.lte(0)) return "No Punchcard Selected."
                                    let str = tmp.pu.levelables[player.pu.selectedPunchcards[player.pu.selectionIndex]].title
                                    return str.substring(0, str.indexOf("<small style='color:gray'>"))
                                }, {color: "white", fontSize: "24px !important", fontFamily: "monospace"}],
                            ], {width: "500px", height: "47px", borderBottom: "3px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {
                                    if (player.pu.storedSelections.lte(0)) return ""
                                    let str = tmp.pu.levelables[player.pu.selectedPunchcards[player.pu.selectionIndex]].description
                                    str = str.substring(str.indexOf("<u>Active</u><br>")+17)
                                    return str.substring(0, str.indexOf("</span>"))
                                }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {width: "525px", height: "60px"}],
                            ["clickable", 10],
                            ["blank", "10px"],
                        ], {width: "550px", height: "170px"}],
                        ["style-column", [
                            ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13]]],
                        ], {width: "550px", height: "150px", backgroundColor: "#0e1019"}],
                        ["style-column", [
                            ["raw-html", () => {return "Punchcard Selections: " + formatWhole(player.pu.storedSelections)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => { return "Gain punchcard selections on universe resets."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "70px"}],
                    ], {width: "550px", height: "390px", border: "3px solid white", backgroundColor: "#1c2033"}],
                ]
            },
            "Collection": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["clickable", 1],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Common", {color: "#7f7f7f", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#323232", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104],
                                ["levelable", 105], ["levelable", 106], ["levelable", 107], ["levelable", 108],
                            ], {width: "525px", backgroundColor: "#191919", padding: "5px"}],

                            ["style-column", [
                                ["raw-html", "Rare", {color: "#7f5f00", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#322600", borderTop: "3px solid #7f5f00", borderBottom: "3px solid #7f5f00", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204],
                                ["levelable", 205], ["levelable", 206], ["levelable", 207], ["levelable", 208],
                            ], () => {return hasUpgrade("sma", 17) ? {width: "525px", backgroundColor: "#191300", padding: "5px"} : {width: "525px", backgroundColor: "#191300", padding: "5px", borderBottom: "3px solid #7f5f00"}}],

                            ["style-column", [
                                ["raw-html", "Epic", {color: "#003f7f", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => {return hasUpgrade("sma", 17) ? {width: "535px", height: "40px", backgroundColor: "#001932", borderTop: "3px solid #003f7f", borderBottom: "3px solid #003f7f", userSelect: "none"} : {display: "none !important"}}],
                            ["style-row", [
                                ["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304],
                            ], () => {return hasUpgrade("sma", 17) ? {width: "525px", backgroundColor: "#000c19", padding: "5px"} : {display: "none !important"}}],
                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", border: "3px solid white", backgroundColor: "#1c2033"}],
                ]
            },
        }
    },
    tabFormat: [
        ["blank", "25px"],
        ["style-row", [
            ["hoverless-clickable", 2],
            ["style-row", [], () => {return player.sma.inStarmetalChallenge ? {width: "3px", height: "40px", backgroundColor: "white"} : {display: "none !important"}}],
            ["hoverless-clickable", 3],
        ], {width: "550px", height: "40px", borderTop: "3px solid white", borderLeft: "3px solid white", borderRight: "3px solid white"}],
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return true},
})