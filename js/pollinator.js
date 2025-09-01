const POLLINATOR_INFO = {
    beetle: {
        name: "Beetle",
        image: "resources/pollinators/beetle.png",
        fact: "Beetles pollinate close to 90% of all flowering plants.",
        effect1: "Celestial Points: x",
        effect2: "Factor Base: x",
    },
    fly: {
        name: "Fly",
        image: "resources/pollinators/fly.png",
        fact: "Flies are the dominant pollinator in alpine and subarctic environments.",
        effect1: "Factor Power: x",
        effect2: "Prestige Points: x",
    },
    bat: {
        name: "Bat",
        image: "resources/pollinators/bat.png",
        fact: "300 species of fruit rely on bats for pollination. These include species of bananas, mangoes, and durians.",
        effect1: "Leaves: x",
        effect2: "Trees: x",
    },
    wind: {
        name: "Wind",
        image: "resources/pollinators/wind.png",
        fact: "12% of all flowering plants, including most grasses, are wind pollinated.",
        effect1: "Grass Value: x",
        effect2: "Golden Grass Value: x",
    },
    bee: {
        name: "Bee",
        image: "resources/pollinators/bee.png",
        fact: "A fourth of all food production relies on bee pollination.",
        effect1: "Grasshoppers: x",
        effect2: "Fertilizer: x",
    },
    butterfly: {
        name: "Butterfly",
        image: "resources/pollinators/butterfly.png",
        fact: "Butterflies tend to pollinate colorful plants. (Researchers don't study butterflies so this is all I got)",
        effect1: "Lines of Code: x",
        effect2: "Mods: x",
    },
    ant: {
        name: "Ant",
        image: "resources/pollinators/ant.png",
        fact: "Ants are not very effective pollinators, but they still do it.",
        effect1: "Dice Points: x",
        effect2: "Rocket Fuel: x",
        effect3: "Hex Points: x",
    },
    mechanical: {
        name: "Mechanical",
        image: "resources/pollinators/gear.png",
        fact: "Humans can also contribute to pollination, by utillizing techniques such as using pollen spray systems, air blasters, and also pollinating by hand.",
        effect1: "Steel: x",
        effect2: "Oil: x",
    },
    water: {
        name: "Water",
        image: "resources/pollinators/water.png",
        fact: "Many under-water plants rely on water to pollinate.",
        effect1: "Infinity Points: x",
        effect2: "Negative Infinity Points: x",
    },
}
addLayer("pol", {
    name: "Pollinators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockHive: 0, // 0: Nothing Unlocked; 1: Unlocked the Barrier; 2: Unlocked the Universe

        pollinators: new Decimal(0),
        pollinatorsPerSecond: new Decimal(0),

        pollinatorEffects: {
            beetle: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            fly: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            bat: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            wind: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            bee: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            butterfly: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            ant: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1), new Decimal(1)]
            },
            mechanical: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
            water: {
                enabled: false,
                effects: [new Decimal(1), new Decimal(1)]
            },
        },

        currCount: new Decimal(0),
        maxCount: new Decimal(1),

        pollinatorsIndex: "none",
    }},
    automate() {
        if (hasMilestone("s", 16)) {
            buyBuyable("pol", 11)
            buyBuyable("pol", 12)
            buyBuyable("pol", 13)
            buyBuyable("pol", 14)
            buyBuyable("pol", 15)
            buyBuyable("pol", 16)
        }
        if (hasMilestone("s", 17)) {
            buyUpgrade("pol", 11)
            buyUpgrade("pol", 12)
            buyUpgrade("pol", 13)
            buyUpgrade("pol", 14)
            buyUpgrade("pol", 15)
            buyUpgrade("pol", 16)
            buyUpgrade("pol", 17)
            buyUpgrade("pol", 18)
        }
    },
    nodeStyle() {},
    tooltip: "Pollinators",
    color: "#cb8e00",
    branches: ["g", "gh"],
    update(delta) {
        let onepersec = new Decimal(1)
        if (hasUpgrade("i", 22)) {
            // START OF POLLINATORS
            player.pol.pollinatorsPerSecond = player.g.grass.add(1).log(10).pow(0.75).div(3)
            if (hasUpgrade("pol", 12)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("pol", 12))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 12))
            if (hasUpgrade("g", 23)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("g", 23))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("cb", 15))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("p", 13))
            if (hasUpgrade("bi", 17)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("bi", 17))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(levelableEffect("pet", 307)[0])
            if (hasMilestone("gs", 18)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.gs.milestone8Effect)
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.le.punchcardsPassiveEffect[13])
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.d.diceEffects[16])
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("gh", 25))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.i.postOTFMult)

            // SOFTCAP
            if (player.pol.pollinators.gt(1e15)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.div(1e15).pow(Decimal.add(0.5, buyableEffect("pol", 16))).mul(1e15)

            // POST-SOFTCAP MULTIPLIERS
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.co.cores.rocket.effect[2])

            // EXPONENTS
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.pow(buyableEffect("gh", 26))

            // GAIN FUNCTIONS
            if (player.pol.pollinators.lt(player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1))) {
                player.pol.pollinators = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1)
            }
            player.pol.pollinators = player.pol.pollinators.add(player.pol.pollinatorsPerSecond.mul(delta))
        }  

        if (player.pol.pollinators.gte(1e500) && player.pol.unlockHive < 1) {
            player.pol.unlockHive = 1
        }

        // POLLINATOR EFFECTS
        player.pol.pollinatorEffects.beetle.effects[0] = player.pol.pollinators.pow(2.7).div(10).add(1).pow(buyableEffect("pol", 14)) // Celestial Points
        player.pol.pollinatorEffects.beetle.effects[1] = player.pol.pollinators.add(1).log(10).add(1).pow(buyableEffect("pol", 14)) // Factor Base

        player.pol.pollinatorEffects.fly.effects[0] = player.pol.pollinators.pow(2.9).div(10).add(1).pow(buyableEffect("pol", 14)) // Factor Power
        player.pol.pollinatorEffects.fly.effects[1] = player.pol.pollinators.pow(3.1).div(10).add(1).pow(buyableEffect("pol", 14)) // Prestige Points

        player.pol.pollinatorEffects.bat.effects[0] = player.pol.pollinators.pow(3.1).div(10).add(1).pow(buyableEffect("pol", 14)) // Leafs
        player.pol.pollinatorEffects.bat.effects[1] = player.pol.pollinators.pow(2.9).div(10).add(1).pow(buyableEffect("pol", 14)) // Trees

        player.pol.pollinatorEffects.wind.effects[0] = player.pol.pollinators.pow(2.1).div(10).add(1).pow(buyableEffect("pol", 14)) // Grass Value
        player.pol.pollinatorEffects.wind.effects[1] = player.pol.pollinators.add(1).log(2).pow(2).add(1).pow(buyableEffect("pol", 14)) // Golden Grass Value

        player.pol.pollinatorEffects.bee.effects[0] = player.pol.pollinators.pow(0.7).div(10).add(1).pow(buyableEffect("pol", 14)) // Grasshoppers
        player.pol.pollinatorEffects.bee.effects[1] = player.pol.pollinators.pow(1.3).div(10).add(1).pow(buyableEffect("pol", 14)) // Fertilizer

        player.pol.pollinatorEffects.butterfly.effects[0] = player.pol.pollinators.pow(2.3).div(10).add(1).pow(buyableEffect("pol", 14)) // Lines of Code
        if (player.pol.pollinators.lt(1e15)) player.pol.pollinatorEffects.butterfly.effects[1] = player.pol.pollinators.pow(2.1).div(10).add(1).pow(buyableEffect("pol", 14)) // Mods
        if (player.pol.pollinators.gte(1e15)) player.pol.pollinatorEffects.butterfly.effects[1] = player.pol.pollinators.div(1e15).pow(0.1).mul(1e15).pow(2.1).div(10).add(1).pow(buyableEffect("pol", 14)) // Mod Softcap

        player.pol.pollinatorEffects.ant.effects[0] = player.pol.pollinators.add(1).log(10).mul(1.5).add(1).pow(buyableEffect("pol", 14)) // Dice Points
        player.pol.pollinatorEffects.ant.effects[1] = player.pol.pollinators.add(1).log(10).add(1).pow(buyableEffect("pol", 14)) // Rocket Fuel
        player.pol.pollinatorEffects.ant.effects[2] = player.pol.pollinators.add(1).log(60).add(1).log(6).add(1).pow(buyableEffect("pol", 14)) // Hex Points

        player.pol.pollinatorEffects.mechanical.effects[0] = player.pol.pollinators.add(1).log(10).pow(1.75).add(1).pow(buyableEffect("pol", 14)) // steel
        player.pol.pollinatorEffects.mechanical.effects[1] = player.pol.pollinators.add(1).log(65).pow(0.75).div(1.5).add(1).pow(buyableEffect("pol", 14)) // oil

        player.pol.pollinatorEffects.water.effects[0] = player.pol.pollinators.add(1).log(100).pow(1.5).add(1).pow(buyableEffect("pol", 14)) // IP
        player.pol.pollinatorEffects.water.effects[1] = player.pol.pollinators.add(1).log(100).pow(1.25).add(1).pow(buyableEffect("pol", 14)) // NIP

        player.pol.currCount = new Decimal(0)
        for (let prop in player.pol.pollinatorEffects) {
            if (player.pol.pollinatorEffects[prop].enabled) player.pol.currCount = player.pol.currCount.add(1)
        }

        player.pol.maxCount = buyableEffect("pol", 15).add(1)
    },
    clickables: {
        1: {
            title: "Clear<br>Pollinators",
            canClick() {return player.pol.currCount.gt(0)},
            unlocked: true,
            onClick() {
                for (let prop in player.pol.pollinatorEffects) {
                    player.pol.pollinatorEffects[prop].enabled = false
                }
            },
            style() {
                let look = {width: "100px", minHeight: "70px", backgroundColor: "#411", color: "white", fontSize: "9px", border: "5px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                if (!this.canClick()) look.opacity = "0.3"
                return look
            },
        },
        11: {
            title() { return "<img src='resources/pollinators/beetle.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.beetle.enabled },
            unlocked: true,
            onClick() {
                if (player.pol.pollinatorEffects.beetle.enabled) {
                    player.pol.pollinatorEffects.beetle.enabled = false
                } else {
                    player.pol.pollinatorEffects.beetle.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "beetle"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#eaf6f7", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.beetle.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        12: {
            title() { return "<img src='resources/pollinators/fly.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.fly.enabled },
            unlocked: true,
            onClick() {
                player.pol.pollinatorsIndex = "fly"
                if (player.pol.pollinatorEffects.fly.enabled) {
                    player.pol.pollinatorEffects.fly.enabled = false
                } else {
                    player.pol.pollinatorEffects.fly.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "fly"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#31aeb0", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.fly.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        13: {
            title() { return "<img src='resources/pollinators/bat.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.bat.enabled },
            unlocked: true,
            onClick() {
                if (player.pol.pollinatorEffects.bat.enabled) {
                    player.pol.pollinatorEffects.bat.enabled = false
                } else {
                    player.pol.pollinatorEffects.bat.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "bat"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#0B6623", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.bat.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        14: {
            title() { return "<img src='resources/pollinators/wind.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.wind.enabled },
            unlocked() { return hasUpgrade("pol", 11) },
            onClick() {
                if (player.pol.pollinatorEffects.wind.enabled) {
                    player.pol.pollinatorEffects.wind.enabled = false
                } else {
                    player.pol.pollinatorEffects.wind.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "wind"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#119B35", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.wind.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        15: {
            title() { return "<img src='resources/pollinators/bee.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.bee.enabled },
            unlocked() { return hasUpgrade("pol", 14) },
            onClick() {
                if (player.pol.pollinatorEffects.bee.enabled) {
                    player.pol.pollinatorEffects.bee.enabled = false
                } else {
                    player.pol.pollinatorEffects.bee.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "bee"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#19e04d", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.bee.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        16: {
            title() { return "<img src='resources/pollinators/butterfly.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.butterfly.enabled },
            unlocked() { return hasUpgrade("pol", 16) },
            onClick() {
                if (player.pol.pollinatorEffects.butterfly.enabled) {
                    player.pol.pollinatorEffects.butterfly.enabled = false
                } else {
                    player.pol.pollinatorEffects.butterfly.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "butterfly"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "#0951a6", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.butterfly.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        17: {
            title() { return "<img src='resources/pollinators/ant.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.ant.enabled },
            unlocked() { return hasUpgrade("pol", 18) },
            onClick() {
                if (player.pol.pollinatorEffects.ant.enabled) {
                    player.pol.pollinatorEffects.ant.enabled = false
                } else {
                    player.pol.pollinatorEffects.ant.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "ant"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "linear-gradient(45deg, #8a00a9, #0061ff)", borderColor: "purple", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.ant.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        18: {
            title() { return "<img src='resources/pollinators/gear.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.mechanical.enabled },
            unlocked() { return hasUpgrade("bi", 116) },
            onClick() {
                if (player.pol.pollinatorEffects.mechanical.enabled) {
                    player.pol.pollinatorEffects.mechanical.enabled = false
                } else {
                    player.pol.pollinatorEffects.mechanical.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "mechanical"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "linear-gradient(45deg, #919191, #545454)", borderColor: "gray", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.mechanical.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        19: {
            title() { return "<img src='resources/pollinators/water.png' style='width:80px;height:80px;transform:translateY(3px)'></img>"},
            canClick() { return player.pol.currCount.lt(player.pol.maxCount) || player.pol.pollinatorEffects.water.enabled },
            unlocked() { return hasUpgrade("cs", 1101) },
            onClick() {
                if (player.pol.pollinatorEffects.water.enabled) {
                    player.pol.pollinatorEffects.water.enabled = false
                } else {
                    player.pol.pollinatorEffects.water.enabled = true
                }
            },
            onHover() {
                player.pol.pollinatorsIndex = "water"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', borderRadius: "0px", background: "linear-gradient(45deg, #FFBF00 5%, #b2d8d8 95%)", borderColor: "#26C9FC", borderWidth: "4px"}
                if (!player.pol.pollinatorEffects.water.enabled) look.filter = "brightness(0.5)"
                return look
            },
        },
        100: {
            title() { return "<h1>UNLOCK" },
            canClick() {
                return player.pol.pollinators.gte(1e100) && getLevelableAmount("pet", 102).gte(20) && getLevelableAmount("pet", 104).gte(20)
                && getLevelableAmount("pet", 202).gte(15) && getLevelableAmount("pet", 203).gte(15) && getLevelableAmount("pet", 303).gte(8)
                && getLevelableAmount("pet", 305).gte(8) && getLevelableAmount("pet", 402).gte(4)
            },
            unlocked() { return true},
            onClick() {
                player.pol.unlockHive = 2
                player.subtabs["pol"]['stuff'] = 'Main'
                //if (options.newMenu) {
                //    player.tab = 'uh'
                //} else {
                //    player.tab = 'uh'
                //}
            },
            style: { width: '400px', "min-height": '160px' },
        }
    },
    bars: {},
    upgrades: {
        11: {
            title: "Pollinator Upgrade I",
            unlocked() { return true },
            description() { return "Unlocks the wind pollinator." },
            cost: new Decimal(1000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        12: {
            title: "Pollinator Upgrade II",
            unlocked() { return true },
            description() { return "Boost pollinator gain based on pollinators." },
            cost: new Decimal(2500),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
            effect() {
                return player.pol.pollinators.add(1).pow(new Decimal(0.1).add(buyableEffect("pol", 13))).div(4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '120px', },
        },
        13: {
            title: "Pollinator Upgrade III",
            unlocked() { return true },
            description() { return "Unlocks pollinator buyables." },
            cost: new Decimal(10000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        14: {
            title: "Pollinator Upgrade IV",
            unlocked() { return true },
            description() { return "Unlocks the bee pollinator." },
            cost: new Decimal(25000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        15: {
            title: "Pollinator Upgrade V",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks more pollinator buyables." },
            cost: new Decimal(100000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        16: {
            title: "Pollinator Upgrade VI",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks the butterfly pollinator." },
            cost: new Decimal(500000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        17: {
            title: "Pollinator Upgrade VII",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Boost Crystals based on pollinators." },
            cost: new Decimal(2500000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
            effect() {
                return player.pol.pollinators.add(1).log(10).div(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '120px', },
        },
        18: {
            title: "Pollinator Upgrade VIII",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks the ant pollinator." },
            cost: new Decimal(10000000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).div(player.pol.pollinators.plus(1).log10()) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Promised Pollinators"
            },
            display() {
                return "which guarantees you have at least " + format(tmp[this.layer].buyables[this.id].effect) + " seconds worth of pollinators (scales down based on pollinators).\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(2.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.25).add(1) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Plentiful Pollinators"
            },
            display() {
                return "which boosts pollinator gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Propagating Pollinators"
            },
            display() {
                return "which improves pollinator upgrade II's scaling by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(1000000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Potent Pollination"
            },
            display() {
                return "which boosts pollinator effects by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1e5) },
            purchaseLimit() {
                let amt = new Decimal(2)
                if (hasUpgrade("pol", 11)) amt = amt.add(1)
                if (hasUpgrade("pol", 14)) amt = amt.add(1)
                if (hasUpgrade("pol", 16)) amt = amt.add(1)
                if (hasUpgrade("pol", 18)) amt = amt.add(1)
                if (hasUpgrade("bi", 116)) amt = amt.add(1)
                if (hasUpgrade("cs", 1101)) amt = amt.add(1)
                return amt
            },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Practical Pollination"
            },
            display() {
                return "which increases max selectable pollinators by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(1e20) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pleased Pollination"
            },
            display() {
                return "which increases pollinators softcap exponent by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Pollinator<br>Count", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "100px", height: "40px", borderBottom: "3px solid #cb8e00"}],
                                ["style-column", [
                                    ["raw-html", function () { return formatWhole(player.pol.currCount) + "/" + formatWhole(player.pol.maxCount)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "100px", height: "27px", backgroundColor: "#513800", borderBottom: "3px solid #cb8e00"}],
                                ["style-column", [
                                    ["clickable", 1],
                                ], {width: "100px", height: "70px", backgroundColor: "black"}],
                            ], {width: "100px", height: "143px", borderRight: "3px solid #cb8e00"}],
                            ["style-column", [
                                ["style-row", [
                                    ["raw-html", function () {
                                        if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex] !== 'undefined') {
                                            return POLLINATOR_INFO[player.pol.pollinatorsIndex].name
                                        }
                                        return "None"
                                    }, {color: "white", fontSize: "26px", fontFamily: "monospace"}],
                                ], {width: "397px", height: "40px", borderBottom: "3px solid #cb8e00"}],
                                ["style-column", [
                                    ["raw-html", function () {
                                        if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex].effect1 !== 'undefined') {
                                                return POLLINATOR_INFO[player.pol.pollinatorsIndex].effect1 + format(player.pol.pollinatorEffects[player.pol.pollinatorsIndex].effects[0])
                                            }
                                        }
                                        return ""
                                    }, () => {
                                        if (typeof player.pol.pollinatorEffects[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (!player.pol.pollinatorEffects[player.pol.pollinatorsIndex].enabled) return {color: "gray", fontSize: "20px", fontFamily: "monospace"}
                                        }
                                        return {color: "white", fontSize: "20px", fontFamily: "monospace"}
                                    }],
                                    ["raw-html", function () {
                                        if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex].effect2 !== 'undefined') {
                                                return POLLINATOR_INFO[player.pol.pollinatorsIndex].effect2 + format(player.pol.pollinatorEffects[player.pol.pollinatorsIndex].effects[1])
                                            }
                                        }
                                        return ""
                                    }, () => {
                                        if (typeof player.pol.pollinatorEffects[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (!player.pol.pollinatorEffects[player.pol.pollinatorsIndex].enabled) return {color: "gray", fontSize: "20px", fontFamily: "monospace"}
                                        }
                                        return {color: "white", fontSize: "20px", fontFamily: "monospace"}
                                    }],
                                    ["raw-html", function () {
                                        if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex].effect3 !== 'undefined') {
                                                return POLLINATOR_INFO[player.pol.pollinatorsIndex].effect3 + format(player.pol.pollinatorEffects[player.pol.pollinatorsIndex].effects[2])
                                            }
                                        }
                                        return ""
                                    }, () => {
                                        if (typeof player.pol.pollinatorEffects[player.pol.pollinatorsIndex] !== 'undefined') {
                                            if (!player.pol.pollinatorEffects[player.pol.pollinatorsIndex].enabled) return {color: "gray", fontSize: "20px", fontFamily: "monospace"}
                                        }
                                        return {color: "white", fontSize: "20px", fontFamily: "monospace"}
                                    }],
                                ], {width: "397px", height: "100px", backgroundColor: "#3c2a00"}],
                            ], {width: "397px", height: "143px"}],
                        ], {borderBottom: "3px solid #cb8e00"}],
                        ["style-column", [
                            ["left-row", [["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15]]],
                            ["left-row", [["hoverless-clickable", 16], ["hoverless-clickable", 17], ["hoverless-clickable", 18], ["hoverless-clickable", 19]]],
                        ], {width: "500px", backgroundColor: "#281c00", borderBottom: "3px solid #cb8e00"}],
                        ["style-row", [
                            ["style-column", [
                                ["raw-html", "Fun<br>Fact", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "77px", height: "75px", backgroundColor: "#513800", borderRight: "3px solid #cb8e00", borderRadius: "0px 0px 0px 12px"}],
                            ["style-column", [
                                ["raw-html", function () {
                                    if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex] !== 'undefined') {
                                        if (typeof POLLINATOR_INFO[player.pol.pollinatorsIndex].fact !== 'undefined') {
                                            return POLLINATOR_INFO[player.pol.pollinatorsIndex].fact
                                        }
                                    }
                                    return "Fun Fact: Without pollinators, all terrestrial ecosystems will collapse."
                                }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "400px", height: "75px", padding: "0px 10px"}],
                        ], {width: "500px", height: "75px", backgroundColor: "#3c2a00", borderRadius: "0px 0px 12px 12px"}],
                    ], {width: "500px", backgroundColor: "#654700", border: "3px solid #cb8e00", borderRadius: "15px"}],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],
                        ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18]], {maxWidth: "600px"}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],
                    ], {maxWidth: "900px"}],
                ]
            },
            "???": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false /*player.pol.unlockHive == 1*/ },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Unlock ???:" }, { color: "white", fontSize: "36px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return format(player.pol.pollinators) + "/1e100 Pollinators" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 101)) + "/20 Egg Guy Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 104)) + "/20 Gd Checkpoint Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 202)) + "/15 Star Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 203)) + "/15 Normal Face Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 303)) + "/8 Drippy Ufo Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 305)) + "/8 Antimatter Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return formatWhole(getLevelableAmount("pet", 402)) + "/4 Dragon Level" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", "COMING SOON", { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    //["row", [["clickable", 100]]],
                ]
            }
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.pol.pollinators) + "</h3> pollinators." }, {color: "#cb8e00", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => { return "(+" + format(player.pol.pollinatorsPerSecond) + "/s)" }, {color: "#cb8e00", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => { return player.pol.pollinators.gt(1e15) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["microtabs", "stuff", { borderWidth: '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 22) && !(inChallenge("ip", 12) || inChallenge("ip", 18)) }
})
