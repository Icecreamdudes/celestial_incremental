addLayer("car", {
    name: "Cards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cardPoints: [
            []
        ]
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(60deg, rgb(182, 0, 0) 0%, rgb(24, 24, 24) 50%, rgb(182, 0, 0) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(182, 0, 0)",
            "color": "white",
            borderRadius: "4px",
            transform: "translateX(50px)"
        }
    },
    tooltip: "Cards",
    color: "rgb(182, 0, 0)",
    branches: ["cbs",],
    update(delta) {
    },
    clickables: {
        1: {
            title() {return "Level Up"},
            canClick() {return getLevelableXP("car", layers.car.levelables.index).gte(tmp.car.levelables[layers.car.levelables.index].xpReq) && layers.car.levelables.index != 0},
            unlocked() {return true},
            onClick() {
                addLevelableXP("car", layers.car.levelables.index, tmp.car.levelables[layers.car.levelables.index].xpReq.neg())
                addLevelables("car", layers.car.levelables.index, 1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "425px", minHeight: "40px", color: "white", fontSize: "12px", borderRadius: "0px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#384166"
                return look
            }
        },
    },
    levelables: {
        0: {
            image() { return "resources/Punchcards/lockedPunchcard.png"},
            title() { return "No Card Selected." },
            description() { return "" },
            canSelect: false,
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() { return {width: '80px', height: '152px', backgroundColor: '#222222'} } 
        },

        //spades
        101: {
            image() {return this.canClick() ? "resources/cards/Spade1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character HP.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.9)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        102: {
            image() {return this.canClick() ? "resources/cards/Spade2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0].mul(100)) + "% to base HP mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.06)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.525).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        103: {
            image() {return this.canClick() ? "resources/cards/Spade3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character DMG.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.55).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        104: {
            image() {return this.canClick() ? "resources/cards/Spade4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to base DMG mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.06)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.575).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        105: {
            image() {return this.canClick() ? "resources/cards/Spade5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character RGN.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.005)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        106: {
            image() {return this.canClick() ? "resources/cards/Spade6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character AGI.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.625).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        107: {
            image() {return this.canClick() ? "resources/cards/Spade7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to base AGI mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.04)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.65).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        108: {
            image() {return this.canClick() ? "resources/cards/Spade8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character DEF.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.675).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        109: {
            image() {return this.canClick() ? "resources/cards/Spade9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character LUCK.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        110: {
            image() {return this.canClick() ? "resources/cards/Spade10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character MND.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.725).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        111: {
            image() {return this.canClick() ? "resources/cards/SpadeJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character POT.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.75).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        112: {
            image() {return this.canClick() ? "resources/cards/SpadeQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to max skill points. [FLOORED]<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.2).floor()
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.775).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        113: {
            image() {return this.canClick() ? "resources/cards/SpadeK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "-" + format(this.effect()[0]) + "% to combo scaling.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.7).mul(0.01).floor()
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        //clubs
        201: {
            image() {return this.canClick() ? "resources/cards/Club1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to chance points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        202: {
            image() {return this.canClick() ? "resources/cards/Club2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to chance point softcap start.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.525).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        203: {
            image() {return this.canClick() ? "resources/cards/Club3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to chance point softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.3).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.55).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        204: {
            image() {return this.canClick() ? "resources/cards/Club4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to heads.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.575).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        205: {
            image() {return this.canClick() ? "resources/cards/Club5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to heads softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.25).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        206: {
            image() {return this.canClick() ? "resources/cards/Club6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to tails.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.575).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        207: {
            image() {return this.canClick() ? "resources/cards/Club7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to tails softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.25).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        208: {
            image() {return this.canClick() ? "resources/cards/Club8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to wheel points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(1.75).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.675).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        209: {
            image() {return this.canClick() ? "resources/cards/Club9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to wheel spin effectiveness.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.625).mul(0.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        210: {
            image() {return this.canClick() ? "resources/cards/Club10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to slot spin effectiveness.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.725).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        211: {
            image() {return this.canClick() ? "resources/cards/ClubJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to red chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(3).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.75).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        212: {
            image() {return this.canClick() ? "resources/cards/ClubQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to blue chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(2).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.775).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        213: {
            image() {return this.canClick() ? "resources/cards/ClubK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to yellow chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        //diamonds
        301: {
            image() {return this.canClick() ? "resources/cards/Diamond1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to rank, tier, and tetr effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.75).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(1.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                ]
            },
            "Collection": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["clickable", 1],
                            ]],
                        ], {width: "550px", height: "175px", borderLeft: "3px solid white", borderRight: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", () => {return "♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠"}, {color: "#1f1f1f", fontSize: "50px", fontFamily: "monospace"}],
                            ], {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104], ["levelable", 105],
                                ["levelable", 106], ["levelable", 107], ["levelable", 108], ["levelable", 109], ["levelable", 110],
                                ["levelable", 111], ["levelable", 112], ["levelable", 113],

                            ], {width: "1175px", height: "152px", backgroundColor: "#303030", padding: "5px"}],

                            ["style-column", [
                                ["raw-html", "♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣", {color: "#1f1f1f", fontSize: "50px", fontFamily: "monospace"}],
                            ], {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205],
                                ["levelable", 206], ["levelable", 207], ["levelable", 208], ["levelable", 209], ["levelable", 210],
                                ["levelable", 211], ["levelable", 212], ["levelable", 213],
                            ], () => {return {width: "1175px", height: "152px", backgroundColor: "#303030", padding: "5px"}}],

                            ["style-column", [
                                ["raw-html", "♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦", {color: "#ff3333", fontSize: "50px", fontFamily: "monospace"}],
                            ], () => {return {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                                ["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304], ["levelable", 305],
                                ["levelable", 306], ["levelable", 307], ["levelable", 308], ["levelable", 309], ["levelable", 310],
                                ["levelable", 311], ["levelable", 312], ["levelable", 313],
                            ], () => {return {width: "1175px", height: "152px", backgroundColor: "#490c0c", padding: "5px"}}],
                            ["style-column", [
                                ["raw-html", "[REDACTED]", {color: "#7f7f7f", fontSize: "30px", fontFamily: "monospace"}],
                            ], () => {return {width: "1185px", height: "50px", backgroundColor: "#323232", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                                ["levelable", 401], ["levelable", 402], ["levelable", 403], ["levelable", 404], ["levelable", 405],
                                ["levelable", 406], ["levelable", 407], ["levelable", 408], ["levelable", 409], ["levelable", 410],
                                ["levelable", 411], ["levelable", 412], ["levelable", 413],
                            ], () => {return{width: "1175px", height: "152px", backgroundColor: "#1c2033", padding: "5px"}}],
                        ], {width: "1200px", height: "522px", borderTop: "3px solid white"}],
                    ], {width: "1200px", height: "700px", border: "3px solid white", backgroundColor: "#1c2033"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 21) && !player.sma.inStarmetalChallenge}
})
