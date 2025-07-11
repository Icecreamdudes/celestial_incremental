
addLayer("st", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✧", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starPower: new Decimal(0),
        starPowerEffect: new Decimal(1), //Points
        starPowerEffect2: new Decimal(1), //Dice Points and Rocket Fuel
        starPowerEffect3: new Decimal(1), //Singularity Dimensions
        starPowerPerSecond: new Decimal(0),

        // Dimension Amounts
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsTimerMax: [new Decimal(5),new Decimal(8),new Decimal(12),new Decimal(18),new Decimal(25),new Decimal(36),new Decimal(50),new Decimal(75),],
        dimensionsGain: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],

        dimensionPower: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionPowerEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        dimensionPowerPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        //dimension power boosts lower tier dimension gain, and dimensions produce its respective dimension power

        //buymax
        dimMax: false,

    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #011247 0%, #37078f 50%, #5d1482 100%)",
            "background-origin": "border-box",
            "border-color": "#eaf6f7",
            "color": "#eaf6f7",
            "font-size": "48px",
        };
    },
    
    tooltip: "Stars",
    branches: [[""]],
    color: "#37078f",
    update(delta) {
        let onepersec = new Decimal(1)

        player.st.dimensionsGain = [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),]
        for (let i = 0; i < 8; i++) {
            if (player.st.buyables[i + 11].gt(0)) player.st.dimensionsTimer[i] = player.st.dimensionsTimer[i].add(delta)
            if (i < 7) {
                player.st.dimensionsGain[i] = player.st.dimensionsGain[i].mul(player.st.dimensionPowerEffects[i + 1])
                player.st.dimensionsGain[i] = player.st.dimensionsGain[i].mul(buyableEffect("st", i + 11))
            }
            if (player.st.dimensionsTimer[i].gte(player.st.dimensionsTimerMax[i])) {
                player.st.dimensionsTimer[i] = new Decimal(0)
                player.st.dimensionAmounts[i] = player.st.dimensionAmounts[i].add(player.st.dimensionsGain[i])
            }

            player.st.dimensionPowerPerSecond[i] = player.st.dimensionAmounts[i].pow(0.5)
            player.st.dimensionPower[i] = player.st.dimensionPower[i].add(player.st.dimensionPowerPerSecond[i].mul(delta))

            if (i > 0) player.st.dimensionPowerEffects[i] = player.st.dimensionPower[i].pow(0.3).add(1)
            if (i == 0) player.st.dimensionPowerEffects[0] = player.st.dimensionPower[0]
        }

        player.st.starPower = player.st.starPower.add(player.st.starPowerPerSecond.mul(delta))
        player.st.starPowerPerSecond = player.st.dimensionPowerEffects[0]
        player.st.starPowerPerSecond = player.st.starPowerPerSecond.mul(buyableEffect("ma", 32))

        player.st.starPowerEffect = player.st.starPower.plus(1).log10().div(100).add(1).min(1.3)
        player.st.starPowerEffect2 = player.st.starPower.pow(50).add(1)
        player.st.starPowerEffect3 = player.st.starPower.pow(0.4).add(1)

        if (player.au2.stars.lte(0)) { 
            player.au2.stars = new Decimal(0)
        }
        player.au2.stars = player.au2.stars.floor()
    },
    bars: {
            0: {
            unlocked() { return getBuyableAmount("st", 1).gte(1) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[0].div(player.st.dimensionsTimerMax[0])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[0]) + "/" + format(player.st.dimensionsTimerMax[0]) + "<h5> seconds to produce 1st dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            1: {
            unlocked() { return getBuyableAmount("st", 1).gte(2) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[1].div(player.st.dimensionsTimerMax[1])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[1]) + "/" + format(player.st.dimensionsTimerMax[1]) + "<h5> seconds to produce 2nd dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            2: {
            unlocked() { return getBuyableAmount("st", 1).gte(3) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[2].div(player.st.dimensionsTimerMax[2])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[2]) + "/" + format(player.st.dimensionsTimerMax[2]) + "<h5> seconds to produce 3rd dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            3: {
            unlocked() { return getBuyableAmount("st", 1).gte(4) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[3].div(player.st.dimensionsTimerMax[3])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[3]) + "/" + format(player.st.dimensionsTimerMax[3]) + "<h5> seconds to produce 4th dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            4: {
            unlocked() { return getBuyableAmount("st", 1).gte(5) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[4].div(player.st.dimensionsTimerMax[4])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[4]) + "/" + format(player.st.dimensionsTimerMax[4]) + "<h5> seconds to produce 5th dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            5: {
            unlocked() { return getBuyableAmount("st", 1).gte(6) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[5].div(player.st.dimensionsTimerMax[5])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[5]) + "/" + format(player.st.dimensionsTimerMax[5]) + "<h5> seconds to produce 6th dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            6: {
            unlocked() { return getBuyableAmount("st", 1).gte(7) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[6].div(player.st.dimensionsTimerMax[6])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[6]) + "/" + format(player.st.dimensionsTimerMax[6]) + "<h5> seconds to produce 7th dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
            7: {
            unlocked() { return getBuyableAmount("st", 1).gte(8) },
            direction: RIGHT,
            width: 250,
            height: 50,
            progress() {
                return player.st.dimensionsTimer[7].div(player.st.dimensionsTimerMax[7])
            },
            fillStyle: {
                "background-color": "#5d1482",
            },
            display() {
                return "<h5>" + format(player.st.dimensionsTimer[7]) + "/" + format(player.st.dimensionsTimerMax[7]) + "<h5> seconds to produce 8th dimensions.</h5>";
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "au2"
            },
            style: { width: "100px", minHeight: "50px", color: "white", borderRadius: "10px", border: "2px solid #0d515a"  },
        },
        2: {
            title() { return "<h3>Level Up" },
            canClick() { return tmp.st.levelables[layers.st.levelables.index].canBuy },
            unlocked() { return layers.st.levelables.index != 0 },
            tooltip() {
                if (tmp.st.levelables[layers.st.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.st.levelables[layers.st.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("st", layers.st.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "40px", borderRadius: "0px", fontSize: '8px'}
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : layers.st.levelables.index >= 1000 ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
        3: {
            title() { return "Buy Max On" },
            canClick() { return player.sd.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.sd.dimMax = true
            },
            style() {
                    return { color: "white", width: '75px', "min-height": '50px', borderRadius: '10px 0px 0px 10px' }
            } 
        },
        4: {
            title() { return "Buy Max Off" },
            canClick() { return player.sd.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.sd.dimMax = false
            },
            style() {
                    return { color: "white", width: '75px', "min-height": '50px', borderRadius: '0px 0px 0px 0px' }
            } 
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
            image() { return this.canClick() ? "resources/gwaCommonPet.png" : "resources/secret.png"},
            title() { return "Gwa" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark celestial points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(4).pow(3).add(1), // Dark Points Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/eggCommonPet.png" : "resources/secret.png"},
            title() { return "Egg Guy" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark rank points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(3).pow(3).add(1), // Rank Point Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },  
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
            image() { return this.canClick() ? "resources/unsmithCommonPet.png" : "resources/secret.png"},
            title() { return "Unsmith" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark tier points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(3).pow(3).add(1), // Tier Point Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/checkpointCommonPet.png" : "resources/secret.png"},
            title() { return "Gd Checkpoint" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark tetr points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(3).pow(3).add(1), // Tetr Point Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/slaxCommonPet.png" : "resources/secret.png"},
            title() { return "Slax" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark prestige points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2).pow(3).add(1), // Dark Prestige Points
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/spiderCommonPet.png" : "resources/secret.png"},
            title() { return "Spider" },
            description() {
                return "x" + format(this.effect()[0]) + " to generators.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(1.8).pow(1.8).add(1), //  Generators
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/blobCommonPet.png" : "resources/secret.png"},
            title() { return "Blob" },
            description() {
                return "x" + format(this.effect()[0]) + " to generator power.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2).pow(2.5).add(1), // Generator Power
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/replicatorCommonPet.png" : "resources/secret.png"},
            title() { return "Replicator" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark grass value.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(1.2).pow(2).add(1), // Grass value
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/smokeCommonPet.png" : "resources/secret.png"},
            title() { return "Smoke" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark grass capacity.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(1.2).pow(2).add(1), // Grass capacity
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(3).add(10).floor() },
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
            image() { return this.canClick() ? "resources/testeUncommonPet.png" : "resources/secret.png"},
            title() { return "Teste" },
            description() {
                return "^" + format(this.effect()[0]) + " to dark celestial point softcap.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).eq(0) ? new Decimal(1) : Decimal.pow(0.98, getLevelableAmount(this.layer, this.id)), // Softcap 
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/starUncommonPet.png" : "resources/secret.png"},
            title() { return "Star" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark rank req.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(3).pow(4).add(1), // Rank Req
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/normalFaceUncommonPet.png" : "resources/secret.png"},
            title() { return "Normal Face" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark tier req.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2.8).pow(4).add(1), // Tier Req
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/sharkUncommonPet.png" : "resources/secret.png"},
            title() { return "Shark" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark tetr req.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2.6).pow(4).add(1), // Tetr Req
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/eyeUncommonPet.png" : "resources/secret.png"},
            title() { return "Eye" },
            description() {
                return "x" + format(this.effect()[0]) + " to dark pent points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.4).add(1), // Pent Points gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/clockUncommonPet.png" : "resources/secret.png"},
            title() { return "Clock" },
            description() {
                return "/" + format(this.effect()[0]) + " to dark grass timer.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.8).mul(0.1).add(1)
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/trollUncommonPet.png" : "resources/secret.png"},
            title() { return "Troll Face" },
            description() {
                return "x" + format(this.effect()[0]) + " to normality.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.5).add(1), // Normality Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/infinityBreakerUncommonPet.png" : "resources/secret.png"},
            title() { return "Infinity Breaker" },
            description() {
                return "/" + format(this.effect()[0]) + " to starmetal req.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(7).pow(4).add(1), // Starmetal Req
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
            image() { return this.canClick() ? "resources/johnUncommonPet.png" : "resources/secret.png"},
            title() { return "John" },
            description() {
                return "x" + format(this.effect()[0]) + " to stars.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.6).mul(0.3).add(1), // Points Gain
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
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(5).add(10).floor() },
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
    },
    upgrades: {},
    buyables: {
        1: {
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.au2.stars },
            unlocked() { return getBuyableAmount(this.layer, this.id).lt(8) },
            cost(x) {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal("10")
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return new Decimal("100")
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return new Decimal("10000")
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    return new Decimal("1e7")
                } else if (getBuyableAmount(this.layer, this.id).eq(4)) {
                    return new Decimal("1e11")
                } else if (getBuyableAmount(this.layer, this.id).eq(5)) {
                    return new Decimal("1e16")
                } else if (getBuyableAmount(this.layer, this.id).eq(6)) {
                    return new Decimal("1e25")
                } else {
                    return getBuyableAmount(this.layer, this.id).sub(6).mul("1e25")
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Next SD: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { color: "white", width: '250px', height: '50px', borderRadius: '0px 10px 10px 0px' }
        },
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(3) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[0] = player.st.dimensionAmounts[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[0] = player.st.dimensionAmounts[0].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(9) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[1] = player.st.dimensionAmounts[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[1] = player.st.dimensionAmounts[1].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        13: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(27) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[2] = player.st.dimensionAmounts[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[2] = player.st.dimensionAmounts[2].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        14: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(81) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(4) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[3] = player.st.dimensionAmounts[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[3] = player.st.dimensionAmounts[3].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        15: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(243) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[4] = player.st.dimensionAmounts[4].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[4] = player.st.dimensionAmounts[4].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        16: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(729) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(6) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[5] = player.st.dimensionAmounts[5].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[5] = player.st.dimensionAmounts[5].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        17: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(2187) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(7) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[6] = player.st.dimensionAmounts[6].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[6] = player.st.dimensionAmounts[6].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        18: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(6561) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("st", 1).gte(8) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.st.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.st.dimensionAmounts[7] = player.st.dimensionAmounts[7].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.st.dimensionAmounts[7] = player.st.dimensionAmounts[7].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },


        //upgrade tree: general
        101: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.3).div(25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting grass gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [102, 103],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", backgroundColor: "#0c6344", borderColor: "#05291c", borderRadius: '10px', borderWidth: '5px' }
        },
        102: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(40).add(1) },
            unlocked() { return player.st.buyables[101].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are dividing dark grass grow time by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg, #53bd96 0%, #147363 100%)", borderColor: "#0e5448", borderRadius: '10px', borderWidth: '5px'   }
        },
        103: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(8).add(1) },
            unlocked() { return player.st.buyables[101].gte(10) },
            branches: [104,],
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting golden grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg, #53bd96 0%,rgb(193, 235, 79) 100%)", borderColor: "#22452e", borderRadius: '10px', borderWidth: '5px'   }

        },        
        104: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return player.gh.steel.add(10).plus(1).log10().pow(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.st.buyables[103].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + " (affected by steel).\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg,rgb(53, 53, 53) 0%,rgb(167, 167, 167) 100%)", borderColor: "#1c1c1c", borderRadius: '10px', borderWidth: '5px'   }
        },
        105: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(75) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(100).pow(2).add(1) },
            unlocked() { return player.st.buyables[103].gte(10) && player.st.buyables[104].gte(10) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting charge rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [103, 104],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(-120deg, #f7f774 0%,rgb(150, 167, 0) 100%)", borderColor: "#ecff5e", borderRadius: '10px', borderWidth: '5px'   }
        },
        106: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(2).add(1) },
            unlocked() { return player.st.buyables[102].gte(5) && player.st.buyables[105].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting normality gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [102, 105],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg,rgb(122, 177, 14) 0%,rgba(193, 223, 0) 50%,rgb(116, 141, 3) 100%)", borderColor: "rgb(128, 255, 111)", borderRadius: '10px', borderWidth: '5px'   }
        },
        107: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(10).add(1) },
            unlocked() { return player.st.buyables[104].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting oil gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [104],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(70deg,rgb(20, 20, 20) 0%,rgb(53, 53, 53) 100%)", borderColor: "rgb(12, 12, 12)", borderWidth: '5px'   }
        },
        108: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).pow(15).add(1) },
            unlocked() { return player.st.buyables[104].gte(20)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting anonymity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [104],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(70deg, #0c04c1 0%,rgb(67, 58, 250) 100%)", borderColor: "hsl(229, 100.00%, 25.30%)", borderWidth: '5px'   }
        },
        109: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.au2.stars },
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).pow(6).add(1) },
            unlocked() { return player.st.buyables[107].gte(20) && player.st.buyables[108].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [107, 108],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "black", background: "linear-gradient(45deg, #fcff04 0%, #befa32 100%)", borderColor: "#fcff04", borderWidth: '5px'   }
        },


        //Progression
        201: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting star gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [202],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(15deg, #011247 0%, #37078f 50%, #5d1482 100%)", borderColor: "#eaf6f7", borderRadius: '10px', borderWidth: '5px' }
        },
        202: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return true },
            unlocked() { return player.st.buyables[201].gte(10) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Unlocks Planets\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [201],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", borderColor: "#59c2ff", borderRadius: '10px', borderWidth: '5px' }
        },

        //planets
        301: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).pow(Decimal.mul(getBuyableAmount(this.layer, this.id), 7)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "black", background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", borderColor: "#FFBF00", borderRadius: '10px', borderWidth: '5px' }
        },
        302: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(6).pow(Decimal.mul(getBuyableAmount(this.layer, this.id), 4)).add(1) },
            unlocked() { return player.st.buyables[301].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "black", background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", borderColor: "#008080", borderRadius: '10px', borderWidth: '5px' }
        },
        303: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).pow(3).add(1) },
            unlocked() { return player.st.buyables[302].gte(5) && player.st.buyables[301].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting singularity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302, 301],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '140px', height: '140px', color: "white", background: "linear-gradient(-120deg, #6b1919 0%, #000000 100%)", borderColor: "#6b1919", borderRadius: '10px', borderWidth: '5px' }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
                "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                            ["layer-proxy", ["ro", [
                            ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                   ["style-column", [
                        ["raw-html", function () { return player.ro.rocketNames[player.ro.rocketIndex] }, { "color": "#dbdbdb", "font-size": "36px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #dbdbdb", borderBottom: "0px", backgroundColor: "#1c1c1c", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}], 
                    ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],

                                                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Evolution shard cost: " + formatWhole(player.ro.evoCost) + "" }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Paragon shard cost: " + formatWhole(player.ro.paragonCost) + "" }, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 15],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Launching the rocket performs a singularity equivalent reset, uses activated fuel and rocket parts, and resets selected pet levels." }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "0px 0px 15px 15px"}],
                   ]]]
                ]
            },
            "Pets": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "15px"],
                                        ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px' }],
                            ]],
                        ], {width: "550px", height: "175px", backgroundColor: "#070024", borderBottom: "3px solid #9badff"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Common", {color: "#9badff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#293b54", borderBottom: "3px solid #9badff", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],["levelable", 107],["levelable", 108],["levelable", 109],]],
                            ], {width: "525px", backgroundColor: "#1f2133", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Uncommon", {color: "#6ddea9", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#1b2e1b", borderTop: "3px solid #6ddea9", borderBottom: "3px solid #6ddea9", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205]]],
                                ["row", [["levelable", 206], ["levelable", 207], ["levelable", 208], ["levelable", 209]]],
                            ], {width: "525px", backgroundColor: "#0f1c18", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616", border: "3px solid rgb(218, 218, 218)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "5px 5px 5px 5px"}],
                ]
            },
            "Upgrade Trees": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
        ["microtabs", "trees", { 'border-width': '0px' }],
                ]
            },
            "Dimensions": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.st.starPower) + "</h3> star power, which boosts point gain by ^" + format(player.st.starPowerEffect) + ",<br>dice points and rocket fuel by x" + format(player.st.starPowerEffect2) + ", and singularity dimensions by x" + format(player.st.starPowerEffect3) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining " + formatWhole(player.st.starPowerPerSecond) + " star power per second." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 3], ["clickable", 4], ["buyable", 1]]],
                    ["blank", "25px"],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(1) ? "1st dimension power: " + format(player.st.dimensionPower[0]) + " (+" + format(player.st.dimensionPowerPerSecond[0]) + "/s, +" + format(player.st.dimensionPowerEffects[0]) + " SP/s)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(1) ? "1st dimension (" + format(buyableEffect("st", "11")) + "x): " + format(player.st.dimensionAmounts[0]) + " (+" + format(player.st.dimensionsGain[0]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 0],
    ["buyable", 11],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(2) ? "2nd dimension power: " + format(player.st.dimensionPower[1]) + " (+" + format(player.st.dimensionPowerPerSecond[1]) + "/s, x" + format(player.st.dimensionPowerEffects[1]) + " 1D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(2) ? "2nd dimension (" + format(buyableEffect("st", "12")) + "x): " + format(player.st.dimensionAmounts[1]) + " (+" + format(player.st.dimensionsGain[1]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 1],
    ["buyable", 12],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(3) ? "3rd dimension power: " + format(player.st.dimensionPower[2]) + " (+" + format(player.st.dimensionPowerPerSecond[2]) + "/s, x" + format(player.st.dimensionPowerEffects[2]) + " 2D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(3) ? "3rd dimension (" + format(buyableEffect("st", "13")) + "x): " + format(player.st.dimensionAmounts[2]) + " (+" + format(player.st.dimensionsGain[2]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 2],
    ["buyable", 13],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(4) ? "4th dimension power: " + format(player.st.dimensionPower[3]) + " (+" + format(player.st.dimensionPowerPerSecond[3]) + "/s, x" + format(player.st.dimensionPowerEffects[3]) + " 3D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(4) ? "4th dimension (" + format(buyableEffect("st", "14")) + "x): " + format(player.st.dimensionAmounts[3]) + " (+" + format(player.st.dimensionsGain[3]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 3],
    ["buyable", 14],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(5) ? "5th dimension power: " + format(player.st.dimensionPower[4]) + " (+" + format(player.st.dimensionPowerPerSecond[4]) + "/s, x" + format(player.st.dimensionPowerEffects[4]) + " 4D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(5) ? "5th dimension (" + format(buyableEffect("st", "15")) + "x): " + format(player.st.dimensionAmounts[4]) + " (+" + format(player.st.dimensionsGain[4]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 4],
    ["buyable", 15],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(6) ? "6th dimension power: " + format(player.st.dimensionPower[5]) + " (+" + format(player.st.dimensionPowerPerSecond[5]) + "/s, x" + format(player.st.dimensionPowerEffects[5]) + " 5D" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(6) ? "6th dimension (" + format(buyableEffect("st", "16")) + "x): " + format(player.st.dimensionAmounts[5]) + " (+" + format(player.st.dimensionsGain[5]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 5],
    ["buyable", 16],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(7) ? "7th dimension power: " + format(player.st.dimensionPower[6]) + " (+" + format(player.st.dimensionPowerPerSecond[6]) + "/s, x" + format(player.st.dimensionPowerEffects[6]) + " 6D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(7) ? "7th dimension (" + format(buyableEffect("st", "17")) + "x): " + format(player.st.dimensionAmounts[6]) + " (+" + format(player.st.dimensionsGain[6]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 6],
    ["buyable", 17],
]],
["row", [
    ["column", [
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(8) ? "8th dimension power: " + format(player.st.dimensionPower[7]) + " (+" + format(player.st.dimensionPowerPerSecond[7]) + "/s, x" + format(player.st.dimensionPowerEffects[7]) + " 7D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
        ["raw-html", function () { return getBuyableAmount("st", 1).gte(8) ? "8th dimension (" + format(buyableEffect("st", "18")) + "x): " + format(player.st.dimensionAmounts[7]) + " (+" + format(player.st.dimensionsGain[7]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
    ], {width: "700px"}],
    ["bar", 7],
    ["buyable", 18],
]],
                ]
            },
        },
            trees: {
            "General": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["always-scroll-column", [
                    ["blank", "25px"],
                    ["row", [
                        ["ex-buyable", 101],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 102],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 106],
                        
                ]],
                    ["blank", "25px"],
                        ["row", [
                        ["ex-buyable", 103],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 105],

                        ]],
                                            ["blank", "25px"],
                        ["row", [
                        ["ex-buyable", 104],
                        ]],
                        ["blank", "25px"],
                        ["row", [
                        ["ex-buyable", 107],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 108],
                        ]],
                        ["blank", "25px"],
                        ["row", [
                        ["ex-buyable", 109],
                        ]],

                 ], {width: "1000px", height: "700px", /*backgroundColor: "#4a4a4a", border: "3px solid #ffffff", paddingTop: "5px", paddingBottom: "5px", borderRadius: "5px 5px 5px 5px"*/}],
                ]
            },
           "Progression": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["always-scroll-column", [
                    ["row", [
                        ["ex-buyable", 201],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 202], 
                        
                ]],

                 ], {width: "1000px", height: "700px", /*backgroundColor: "#4a4a4a", border: "3px solid #ffffff", paddingTop: "5px", paddingBottom: "5px", borderRadius: "5px 5px 5px 5px"*/}],
                ]
            },
            "Planets": {
                buttonStyle() { return { color: "white", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", borderColor: "#59c2ff",borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.pl.planets) + "</h3> planets." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["always-scroll-column", [
                    ["row", [
                        ["ex-buyable", 301],
                        ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["ex-buyable", 303], 
                        
                ]],
                    ["blank", "25px"],
                                    ["row", [
                        ["ex-buyable", 302],
                        
                ]],

                 ], {width: "1000px", height: "700px", /*backgroundColor: "#4a4a4a", border: "3px solid #ffffff", paddingTop: "5px", paddingBottom: "5px", borderRadius: "5px 5px 5px 5px"*/}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.au2.au2Unlocked }
})
