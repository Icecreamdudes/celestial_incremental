addLayer("sme", {
    name: "Starmetal Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SME", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starmetalEssence: new Decimal(0),
        starmetalEssenceSoftcap: new Decimal(1),

        generatorTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        generatorTimersMax: [new Decimal(10),new Decimal(40),new Decimal(90),new Decimal(160),new Decimal(250),],
        generatorProduction: [new Decimal(1),new Decimal(5),new Decimal(12),new Decimal(20),new Decimal(35),],

        starmetalResetToggle: false,
        autoLeaveToggle: false,
        autoEnterToggle: false,

        leaveInput: new Decimal(0),
        leaveAmount: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",
            "background-origin": "border-box",
            "border-color": "#282363",
            "color": "#282363",
        };
    },
    tooltip: "Starmetal Essence",
    branches: ["ma", "sd", "sma"],
    color: "#d460eb",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sme.generatorTimersMax = 
        [
            new Decimal(10),new Decimal(40),new Decimal(90),new Decimal(160),new Decimal(250),
        ]
        player.sme.generatorTimersMax[0] = player.sme.generatorTimersMax[0].div(buyableEffect("sme", 10))
        player.sme.generatorTimersMax[1] = player.sme.generatorTimersMax[1].div(buyableEffect("sme", 11))
        player.sme.generatorTimersMax[2] = player.sme.generatorTimersMax[2].div(buyableEffect("sme", 12))
        player.sme.generatorTimersMax[3] = player.sme.generatorTimersMax[3].div(buyableEffect("sme", 13))
        player.sme.generatorTimersMax[4] = player.sme.generatorTimersMax[4].div(buyableEffect("sme", 14))

        player.sme.starmetalEssenceSoftcap = player.sme.starmetalEssence.pow(0.5).div(15).add(1)
        
        player.sme.generatorProduction = 
        [
            new Decimal(1),new Decimal(7),new Decimal(16),new Decimal(30),new Decimal(60),
        ]

        for (let i = 0; i < player.sme.generatorTimers.length; i++) {
            if (player.sme.buyables[i].gte(1)) player.sme.generatorTimers[i] = player.sme.generatorTimers[i].add(onepersec.mul(delta))

            player.sme.generatorTimersMax[i] = player.sme.generatorTimersMax[i].mul(player.sme.starmetalEssenceSoftcap)
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(buyableEffect("sme", i))
            if (player.sme.generatorTimers[i].gte(player.sme.generatorTimersMax[i]))
            {
                player.sme.starmetalEssence = player.sme.starmetalEssence.add(player.sme.generatorProduction[i])
                player.sme.generatorTimers[i] = new Decimal(0)
            }
        }
        
        if (player.sme.leaveInput.gte(1)) player.sme.leaveAmount = player.sme.leaveInput
        if (player.sme.leaveInput.lt(1)) player.sme.leaveAmount = new Decimal(1)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '125px', "min-height": '50px', borderRadius: "5px" },
        },
        2: {
            title() { return "<h3>Level up binding" },
            canClick() { return tmp.sme.levelables[layers.sme.levelables.index].canBuy },
            unlocked() { return layers.sme.levelables.index != 0 },
            tooltip() {
                if (tmp.sme.levelables[layers.sme.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.sme.levelables[layers.sme.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("sme", layers.sme.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "40px", borderRadius: "0px", fontSize: '8px'}
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : layers.sme.levelables.index >= 1000 ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
        11: {
            title() { return "Auto Starmetal Resets On" },
            canClick() { return player.sme.starmetalResetToggle == false },
            unlocked() { return true },
            onClick() {
                player.sme.starmetalResetToggle = true
            },
            style: { width: '150px', "min-height": '100px', }
        },
        12: {
            title() { return "Auto Starmetal Resets Off" },
            canClick() { return player.sme.starmetalResetToggle == true  },
            unlocked() { return true },
            onClick() {
                player.sme.starmetalResetToggle = false
            },
            style: { width: '150px', "min-height": '100px', }
        },
        13: {
            title() { return "Auto Leave DU1 On" },
            canClick() { return player.sme.autoLeaveToggle == false },
            unlocked() { return true },
            onClick() {
                player.sme.autoLeaveToggle = true
            },
            style: { width: '150px', "min-height": '100px', }
        },
        14: {
            title() { return "Auto Leave DU1 Off" },
            canClick() { return player.sme.autoLeaveToggle == true  },
            unlocked() { return true },
            onClick() {
                player.sme.autoLeaveToggle = false
            },
            style: { width: '150px', "min-height": '100px', }
        },
        15: {
            title() { return "Auto Enter DU1 On" },
            canClick() { return player.sme.autoEnterToggle == false },
            unlocked() { return true },
            onClick() {
                player.sme.autoEnterToggle = true
            },
            style: { width: '150px', "min-height": '100px', }
        },
        16: {
            title() { return "Auto Enter DU1 Off" },
            canClick() { return player.sme.autoEnterToggle == true  },
            unlocked() { return true },
            onClick() {
                player.sme.autoEnterToggle = false
            },
            style: { width: '150px', "min-height": '100px', }
        },

    },
    bars: {
        0: {
            unlocked() { return player.sme.buyables[0].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[0].div(player.sme.generatorTimersMax[0])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[0]) + "/" + format(player.sme.generatorTimersMax[0]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[0]) + " starmetal essence.</h5>";
            },

        },
                1: {
            unlocked() { return player.sme.buyables[1].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[1].div(player.sme.generatorTimersMax[1])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[1]) + "/" + format(player.sme.generatorTimersMax[1]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[1]) + " starmetal essence.</h5>";
            },
        },
                2: {
            unlocked() { return player.sme.buyables[2].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[2].div(player.sme.generatorTimersMax[2])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[2]) + "/" + format(player.sme.generatorTimersMax[2]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[2]) + " starmetal essence.</h5>";
            },

        },
                3: {
            unlocked() { return player.sme.buyables[3].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[3].div(player.sme.generatorTimersMax[3])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[3]) + "/" + format(player.sme.generatorTimersMax[3]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[3]) + " starmetal essence.</h5>";
            },

        },
                4: {
            unlocked() { return player.sme.buyables[4].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[4].div(player.sme.generatorTimersMax[4])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[4]) + "/" + format(player.sme.generatorTimersMax[4]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[4]) + " starmetal essence.</h5>";
            },

        },
    },
    upgrades: { 
    },
    levelables: {
                0: {
            image() { return "resources/Pets/secret.png"},
            title() { return "No pet selected." },
            lore() { return "" },
            description() { return "" },
            currency() { return player.sme.starmetalEssence },
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() { return { width: '100px', height: '125px', backgroundColor: '#222222'} } 
        },
            101: {
            image() { return this.canClick() ? "resources/Pets/dotknightEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Dotknight" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][0], // Health
                    player.fi.petDamage[0][0], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[401][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 0
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[101][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
                    102: {
            image() { return this.canClick() ? "resources/Pets/dragonEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Dragon" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][1], // Health
                    player.fi.petDamage[0][1], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[402][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 1
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[102][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
                            103: {
            image() { return this.canClick() ? "resources/Pets/cookieEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Cookie" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][2], // Health
                    player.fi.petDamage[0][2], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[403][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 2
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[103][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
                                    104: {
            image() { return this.canClick() ? "resources/Pets/kresEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Kres" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][3], // Health
                    player.fi.petDamage[0][3], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[404][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 3
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[104][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
                                            105: {
            image() { return this.canClick() ? "resources/Pets/navEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Nav" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][4], // Health
                    player.fi.petDamage[0][4], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[405][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 4
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[105][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
                                                    106: {
            image() { return this.canClick() ? "resources/Pets/selEpicPet.png" : "resources/Pets/secret.png"},
            title() { return "Sel" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[0][5], // Health
                    player.fi.petDamage[0][5], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[406][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 0
                player.fi.petIndex = 5
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt)},
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(3).mul(100).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[106][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },

        //legs
        201: {
            image() { return this.canClick() ? "resources/Pets/eclipseLegendaryPet.png" : "resources/Pets/secret.png"},
            title() { return "Eclipse" },
            description() {
                return "Max HP: " + format(this.effect()[0]) + "<br>Damage: " + format(this.effect()[1])
            },
            levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.fi.petMaxHP[1][0], // Health
                    player.fi.petDamage[1][0], // Damage
                    false, //activation
                ]
            },
            sacValue() { return new Decimal(0)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return player.pet.levelables[501][0].gte(1) },
            onClick() { 
                player.fi.rarityIndex = 1
                player.fi.petIndex = 0
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { player.sme.starmetalEssence = player.sme.starmetalEssence.sub(amt) },
            canAfford() { return player.sme.starmetalEssence.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(4).mul(1000).floor() },
            currency() { return player.sme.starmetalEssence },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                player.sme.levelables[201][2] ? look.backgroundColor = "#a60000ff" : this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
    },
    buyables: {
        0: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator I"
            },
            display() {
                return 'which are boosting starmetal essence generator I production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        1: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator II"
            },
            display() {
                return 'which are boosting starmetal essence generator II production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        2: {
            costBase() { return new Decimal(600) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.85)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator III"
            },
            display() {
                return 'which are boosting starmetal essence generator III production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        3: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator IV"
            },
            display() {
                return 'which are boosting starmetal essence generator IV production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        4: {
            costBase() { return new Decimal(18000) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.95)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator V"
            },
            display() {
                return 'which are boosting starmetal essence generator V production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },

        //radiation
        10: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[0].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener I"
            },
            display() {
                return 'which are dividing starmetal essence generator I time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
        11: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(1.625) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[1].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener II"
            },
            display() {
                return 'which are dividing starmetal essence generator II time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
        12: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[2].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener III"
            },
            display() {
                return 'which are dividing starmetal essence generator III time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
                13: {
            costBase() { return new Decimal(1e13) },
            costGrowth() { return new Decimal(1.875) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[3].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener IV"
            },
            display() {
                return 'which are dividing starmetal essence generator IV time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
                14: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[4].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener V"
            },
            display() {
                return 'which are dividing starmetal essence generator V time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Generators": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ra.radiation) + "</h3> radiation." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["bar", 0], ["ex-buyable", 0], ["ex-buyable", 10]]],
                    ["row", [["bar", 1], ["ex-buyable", 1], ["ex-buyable", 11]]],
                    ["row", [["bar", 2], ["ex-buyable", 2], ["ex-buyable", 12]]],
                    ["row", [["bar", 3], ["ex-buyable", 3], ["ex-buyable", 13]]],
                    ["row", [["bar", 4], ["ex-buyable", 4], ["ex-buyable", 14]]],
                    ["blank", "25px"],  
                ]
            },
            "Starmetal Automation": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],  
                            ["style-column", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return format(player.sma.starmetalAlloy) + " SMA"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ]],
                        ], {width: "400px", height: "30px", backgroundColor: "#8e3f9eff"}],
                        ["style-column", [
                    ["raw-html", function () { return "Autoleave amount: " + formatWhole(player.sme.leaveAmount) + " SMA."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                        ], {width: "400px", height: "70px"}],
                        ["text-input", "leaveInput", {width: "350px", height: "50px", backgroundColor: "#30003aff", color: "white", fontSize: "32px", textAlign: "left", border: "0px", padding: "0px 25px"}],
                        ["style-column", [
        ["row", [["clickable", 11], ["clickable", 12]]],
                            ["row", [["clickable", 13], ["clickable", 14]]],
                            ["row", [["clickable", 15], ["clickable", 16]]],
                        ], {width: "400px", height: "400px"}],
                    ], {width: "400px", height: "600px", backgroundColor: "#d460eb", border: "3px solid #ccc"}],
                ]
            },
            "Starmetal Binding": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
        ["microtabs", "binding", { 'border-width': '0px' }],
                ]
            },
        },
                        binding: {
            "Pets": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Starmetal Binding is used in Check Back's fighting system. (Which is unlocked after Matos)"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                        ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px' }],
                            ]],
                        ], {width: "550px", height: "175px", backgroundColor: "#29132eff", borderBottom: "3px solid #cb79ed"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616", border: "3px solid rgb(218, 218, 218)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "5px 5px 5px 5px"}],
                ]
            },
            "Punchcards": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "We need to wait for forwaken's update gng"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "To make sure you don't forget this feature basically you bind punchcards with starmetal essence to boost it's passive and active effects."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    }, 
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.sme.starmetalEssence) + "</h3> starmetal essence." }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ["raw-html", function () { return "Your starmetal essence extends generator time requirements by x<h3>" + format(player.sme.starmetalEssenceSoftcap) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated  }
})
