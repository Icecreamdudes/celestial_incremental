addLayer("spet", {
    name: "Space Pets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #9badff 0%, #37078f 200%)",
            backgroundOrigin: "border-box",
            borderColor: "#0000007f",
            color: "#ffffff",
        };
    },
    tooltip: "Space Pets",
    branches: ["st"],
    color: "#9badff",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    bars: {},
    clickables: {
        1: {
            title() { return "Ascend Pet" },
            canClick() {
                if (player.ir.spaceRock.lt(Decimal.pow(10, getLevelableTier("spet", layers.spet.levelables.index).add(2)))) return false
                if (tmp.spet.levelables[layers.spet.levelables.index].levelLimit == undefined) {
                    return false
                } else {
                    return getLevelableAmount("spet", layers.spet.levelables.index).gte(tmp.spet.levelables[layers.spet.levelables.index].levelLimit)
                }
            },
            unlocked() { return player.ev.evolutionsUnlocked[3] && layers.spet.levelables.index != 0 },
            tooltip() {return "Costs: " + formatSimple(Decimal.pow(10, getLevelableTier("spet", layers.spet.levelables.index).add(2))) + " Space Rocks"},
            onClick() {
                player.ir.spaceRock = player.ir.spaceRock.sub(Decimal.pow(10, getLevelableTier("spet", layers.spet.levelables.index).add(2)))
                if (getLevelableAmount("spet", layers.spet.levelables.index).gte(tmp.spet.levelables[layers.spet.levelables.index].levelLimit)) {
                    setLevelableTier("spet", layers.spet.levelables.index, getLevelableTier("spet", layers.spet.levelables.index).add(1))
                    setLevelableAmount("spet", layers.spet.levelables.index, new Decimal(0))
                }
            },
            style() {
                let look = {width: "262.5px", minHeight: "40px", borderRadius: "0px", fontSize: '12px'}
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
        2: {
            title() { return "Level Up" },
            canClick() { return tmp.spet.levelables[layers.spet.levelables.index].canBuy },
            unlocked() { return layers.spet.levelables.index != 0 },
            tooltip() {
                if (tmp.spet.levelables[layers.spet.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.spet.levelables[layers.spet.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("spet", layers.spet.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "262.5px", minHeight: "40px", borderRadius: "0px", fontSize: '12px'}
                if (!player.ev.evolutionsUnlocked[3]) look.width = "425px"
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
    },
    levelables: {
        0: {
            image() { return "resources/secret.png"},
            title() { return "No pet selected." },
            lore() { return "" },
            description() { return "" },
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() { return { width: '100px', height: '125px', backgroundColor: '#222222'} } 
        },
        101: {
            image() { return this.canClick() ? "resources/Pets/gwaCommonPet.png" : "resources/secret.png"},
            title() { return "Gwa" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark celestial points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(4).add(1).pow(3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Dark Points Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        102: {
            image() { return this.canClick() ? "resources/Pets/eggCommonPet.png" : "resources/secret.png"},
            title() { return "Egg Guy" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark rank points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(3).add(1).pow(3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Rank Point Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        103: {
            image() { return this.canClick() ? "resources/Pets/unsmithCommonPet.png" : "resources/secret.png"},
            title() { return "Unsmith" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark tier points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(3).add(1).pow(6).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Tier Point Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        104: {
            image() { return this.canClick() ? "resources/Pets/checkpointCommonPet.png" : "resources/secret.png"},
            title() { return "Gd Checkpoint" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark tetr points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(3).add(1).pow(9).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Tetr Point Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        105: {
            image() { return this.canClick() ? "resources/Pets/slaxCommonPet.png" : "resources/secret.png"},
            title() { return "Slax" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark prestige points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(2).add(1).pow(3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Dark Prestige Points
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        106: {
            image() { return this.canClick() ? "resources/Pets/spiderCommonPet.png" : "resources/secret.png"},
            title() { return "Spider" },
            description() {
                return "x" + format(this.effect()[0]) + " to generators.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(1.8).add(1).pow(1.8).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), //  Generators
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        107: {
            image() { return this.canClick() ? "resources/Pets/blobCommonPet.png" : "resources/secret.png"},
            title() { return "Blob" },
            description() {
                return "x" + format(this.effect()[0]) + " to generator power.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(2).add(1).pow(2.5).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Generator Power
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        108: {
            image() { return this.canClick() ? "resources/Pets/replicatorCommonPet.png" : "resources/secret.png"},
            title() { return "Replicator" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark grass value.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(1.2).add(1).pow(2).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Grass value
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        109: {
            image() { return this.canClick() ? "resources/Pets/smokeCommonPet.png" : "resources/secret.png"},
            title() { return "Smoke" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark grass capacity.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(1.2).add(1).pow(2).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Grass capacity
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        110: {
            image() { return this.canClick() ? "resources/Pets/coinFragmentCommonPet.png" : "resources/secret.png"},
            title() { return "Coin Fragment" },
            description() {
                return "x" + format(this.effect()[0]) + " to starmetal alloy.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.div(25).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Starmetal Alloy
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(7500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(3).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#9badff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },

        //Unc
        201: {
            image() { return this.canClick() ? "resources/Pets/testeUncommonPet.png" : "resources/secret.png"},
            title() { return "Teste" },
            description() {
                return "^" + format(this.effect()[0]) + " to dark celestial point softcap.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.eq(0) ? new Decimal(1) : Decimal.pow(0.98, amt.mul(Decimal.pow(1.25, getLevelableTier(this.layer, this.id)))), // Softcap 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        202: {
            image() { return this.canClick() ? "resources/Pets/starUncommonPet.png" : "resources/secret.png"},
            title() { return "Star" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark rank req.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(3).add(1).pow(4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Rank Req
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        203: {
            image() { return this.canClick() ? "resources/Pets/normalFaceUncommonPet.png" : "resources/secret.png"},
            title() { return "Normal Face" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark tier req.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(2.8).add(1).pow(4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Tier Req
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        204: {
            image() { return this.canClick() ? "resources/Pets/sharkUncommonPet.png" : "resources/secret.png"},
            title() { return "Shark" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark tetr req.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(2.6).add(1).pow(4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Tetr Req
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        205: {
            image() { return this.canClick() ? "resources/Pets/eyeUncommonPet.png" : "resources/secret.png"},
            title() { return "Eye" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark pent points.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(3).add(1).pow(12).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Pent Points gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        206: {
            image() { return this.canClick() ? "resources/Pets/clockUncommonPet.png" : "resources/secret.png"},
            title() { return "Clock" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark grass timer.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(0.8).mul(0.1).add(1).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        207: {
            image() { return this.canClick() ? "resources/Pets/trollUncommonPet.png" : "resources/secret.png"},
            title() { return "Troll Face" },
            description() {
                return "x" + format(this.effect()[0]) + " to normality.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.add(1).pow(1.5).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Normality Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        208: {
            image() { return this.canClick() ? "resources/Pets/infinityBreakerUncommonPet.png" : "resources/secret.png"},
            title() { return "Infinity Breaker" },
            description() {
                return "/" + format(this.effect()[0]) + " to starmetal req.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(7).add(1).pow(4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Starmetal Req
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        209: {
            image() { return this.canClick() ? "resources/Pets/johnUncommonPet.png" : "resources/secret.png"},
            title() { return "John" },
            description() {
                return "x" + format(this.effect()[0]) + " to stars.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(0.6).mul(0.3).add(1).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Stars Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        210: {
            image() { return this.canClick() ? "resources/Pets/refinedFragmentUncommonPet.png" : "resources/secret.png"},
            title() { return "Refined Fragment" },
            description() {
                return "x" + format(this.effect()[0]) + " to star power.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.div(2).add(1).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Star Power
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(15000) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(5).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6ddea9" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        //Rare
        301: {
            image() { return this.canClick() ? "resources/Pets/novaRarePet.png" : "resources/secret.png"},
            title() { return "Nova" },
            description() {
                return "x" + format(this.effect()[0]) + " to space energy.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.add(1).pow(1.4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        302: {
            image() { return this.canClick() ? "resources/Pets/diceRarePet.png" : "resources/secret.png"},
            title() { return "Dice" },
            description() {
                return "x" + format(this.effect()[0]) + " to length, width, depth and spissitude.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.4).add(1).pow(1.2).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        303: {
            image() { return this.canClick() ? "resources/Pets/ufoRarePet.png" : "resources/secret.png"},
            title() { return "Drippy Ufo" },
            description() {
                return "x" + format(this.effect()[0]) + " to blood.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.2).add(1).pow(0.8).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        304: {
            image() { return this.canClick() ? "resources/Pets/goofyAhhThingRarePet.png" : "resources/secret.png"},
            title() { return "Goofy Ahh Thing" },
            description() {
                return "x" + format(this.effect()[0]) + " to clouds.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.4).add(1).pow(0.85).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        305: {
            image() { return this.canClick() ? "resources/Pets/antimatterRarePet.png" : "resources/secret.png"},
            title() { return "Antimatter" },
            description() {
                return "/" + format(this.effect()[0]) + " to grass jump req.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(12).add(1).pow(4.5).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // Starmetal Req
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        306: {
            image() { return this.canClick() ? "resources/Pets/hexShadowRarePet.png" : "resources/secret.png"},
            title() { return "Hex Shadow" },
            description() {
                return "x" + format(this.effect()[0]) + " to starmetal essence gain.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.3).add(1).pow(0.75).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        307: {
            image() { return this.canClick() ? "resources/Pets/grassSquareRarePet.png" : "resources/secret.png"},
            title() { return "Grass Square" },
            description() {
                return "/" + format(this.effect()[0]) + " to starmetal essence cooldown.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.2).add(1).pow(0.8).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        308: {
            image() { return this.canClick() ? "resources/Pets/impossibleTriangleRarePet.png" : "resources/secret.png"},
            title() { return "Impossible Triangle" },
            description() {
                return "x" + format(this.effect()[0]) + " to eclipse shards.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.2).add(1).pow(0.6).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        309: {
            image() { return this.canClick() ? "resources/Pets/forbiddenCoreRarePet.png" : "resources/secret.png"},
            title() { return "Forbidden Core" },
            description() {
                return "/" + format(this.effect()[0]) + " to eclipse timer tickspeed.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.1).add(1).pow(0.7).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        310: {
            image() { return this.canClick() ? "resources/Pets/evolutionFragmentRarePet.png" : "resources/secret.png"},
            title() { return "Evolution Fragment" },
            description() {
                return "x" + format(this.effect()[0]) + " to eclipse punchcard XP conversion rate.<br>"
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50)},
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.25).add(1).pow(0.75).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))), 
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.zarDungeon.zarDefeated },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(7).add(10).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#866dde" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        // Space Energy - Nova
        // Length/Width/Depth - Dice
        // Blood - Drippy Ufo
        // Clouds - GAT
        // Grass Jump Req - Antimatter
        // Starmetal Essence Gain - Shadow
        // Starmetal Essence Cooldown - Grass
        // Eclipse Shards - Impossible triangle
        // Eclipse Timer Tickspeed - Forbidden Core
        // Punchcard XP - Evolution fragment
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "15px"],
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2], ["clickable", 1]], {width: '650px', height: '40px' }],
                            ], {width: "650px"}],
                        ], {width: "650px", height: "175px", backgroundColor: "#070024", borderBottom: "3px solid #37078f", borderRadius: "2px 2px 0 0"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Common", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "631px", height: "40px", backgroundColor: "#9badff", border: "2px solid #0000007f", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104], ["levelable", 105], ["levelable", 106]]],
                                ["row", [["levelable", 107], ["levelable", 108], ["levelable", 109], ["levelable", 110]]],
                            ], {width: "631px", background: "repeating-linear-gradient(-45deg, #4e5780 0 15px, #606c9e 0 30px)", padding: "2px"}],
            
                            ["style-column", [
                                ["raw-html", "Uncommon", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "631px", height: "40px", backgroundColor: "#6ddea9", border: "2px solid #0000007f", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205], ["levelable", 206]]],
                                ["row", [["levelable", 207], ["levelable", 208], ["levelable", 209], ["levelable", 210]]],
                            ], {width: "631px", background: "repeating-linear-gradient(-45deg, #377055 0 15px, #458c6b 0 30px)", padding: "2px"}],
                            
                            ["style-column", [
                                ["raw-html", "Rare", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.zarDungeon.zarDefeated ? {width: "631px", height: "40px", backgroundColor: "#866dde", border: "2px solid #0000007f", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304], ["levelable", 305], ["levelable", 306]]],
                                ["row", [["levelable", 307], ["levelable", 308], ["levelable", 309], ["levelable", 310]]],
                            ], {width: "631px", background: "repeating-linear-gradient(-45deg, #433770 0 15px, #54458c 0 30px)", padding: "2px"}],
                        ], {width: "650px", height: "522px"}],
                    ], {width: "650px", height: "700px", backgroundColor: "#161616", border: "3px solid #37078f", borderRadius: "0"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.au2.starsToGet) + ")"}, () => {
                let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.au2.starsToGet.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return player.au2.starSoftcapActive ? "After " + format(player.au2.starSoftcapStart) + " stars, raise star gain by ^" + format(player.au2.starSoftcapEffect, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return true },
})
