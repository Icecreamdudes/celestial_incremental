addLayer("ep0", {
    name: "Dotknight", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dk", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dotknightPoints: new Decimal(0),
        dotknightLevelEffect: new Decimal(1),
        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(60),
                base: new Decimal(2),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(240),
                base: new Decimal(5),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(600),
                base: new Decimal(12),
            },
        },

        //Cursword
        //Pointurret
    }
    },
    nodeStyle: {
        backgroundColor: "#9176af",
    },
    tooltip: "Dotknight",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        let amt = getLevelableAmount("pet", 401).add(getLevelableTier("pet", 401).mul(5).min(40))
        player.ep0.dotknightLevelEffect = amt.pow(1.1).div(10).mul(getLevelableTier("pet", 401).add(1)).add(1)

        player.ep0.timers[0].base = new Decimal(2)
        player.ep0.timers[1].base = new Decimal(5)
        player.ep0.timers[2].base = new Decimal(12)
        for (let thing in player.ep0.timers) {
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(player.ep0.dotknightLevelEffect)
            if (hasUpgrade("ev8", 21)) player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(1.4)
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("ep1", 13))
            if (hasUpgrade("ep2", 11)) player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(upgradeEffect("ep2", 11))
        }

        player.ep0.timers[0].max = new Decimal(60)
        player.ep0.timers[1].max = new Decimal(240)
        player.ep0.timers[2].max = new Decimal(600)
        for (let thing in player.ep0.timers) {
            player.ep0.timers[thing].current = player.ep0.timers[thing].current.sub(onepersec.mul(delta))
        }
    },
    clickables: {
        11: {
            title() { return player.ep0.timers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.timers[0].current) + "." : "<h3>+" + format(player.ep0.timers[0].base) + " Dotknight Points."},
            canClick() { return player.ep0.timers[0].current.lt(0) },
            unlocked: true,
            tooltip() { return "Evo Shard Rarity: 1%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.timers[0].base)
                player.ep0.timers[0].current = player.ep0.timers[0].max

                    let random = getRandomInt(100)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        doPopup("none", "+1 Evolution Shard! (1%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(1);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep0.timers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.timers[1].current) + "." : "<h3>+" + format(player.ep0.timers[1].base) + " Dotknight Points."},
            canClick() { return player.ep0.timers[1].current.lt(0) && this.unlocked() },
            unlocked() { return getLevelableAmount("pet", 401).gte(3) || getLevelableTier("pet", 401).gte(1)},
            tooltip() { return "Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.timers[1].base)
                player.ep0.timers[1].current = player.ep0.timers[1].max

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        doPopup("none", "+1 Evolution Shard! (2%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(2);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep0.timers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.timers[2].current) + "." : "<h3>+" + format(player.ep0.timers[2].base) + " Dotknight Points."},
            canClick() { return player.ep0.timers[2].current.lt(0) && this.unlocked() },
            unlocked() { return getLevelableAmount("pet", 401).gte(6) || getLevelableTier("pet", 401).gte(1)},
            tooltip() { return "DOUBLE Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.timers[2].base)
                player.ep0.timers[2].current = player.ep0.timers[2].max

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        doPopup("none", "+2 Evolution Shard! (2%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(4)
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        99: {
            title() {return "Claim All"},
            canClick() {return tmp.ep0.clickables[11].canClick || tmp.ep0.clickables[12].canClick || tmp.ep0.clickables[13].canClick},
            unlocked() {return getLevelableAmount("pet", 401).gte(3) || getLevelableTier("pet", 401).gte(1)},
            onClick() {
                clickClickable("ep0", 11)
                clickClickable("ep0", 12)
                clickClickable("ep0", 13)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#cb79ed" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    upgrades: {
        11: {
            title: "Dotknight Upgrade I",
            unlocked() { return true },
            description() { return "Boosts replicanti mult based on dotknight points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.2).div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Dotknight Upgrade II",
            unlocked() { return true },
            description() { return "Boosts time cubes based on dotknight points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.35).div(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Dotknight Upgrade III",
            unlocked() { return true },
            description() { return "Boosts dragon points based on dotknight points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Scraps"
            },
            display() {
                return 'which are boosting core scrap gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Crates"
            },
            display() {
                return 'which are boosting crate roll chance by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Cookies"
            },
            display() {
                return 'which are boosting cookies per second by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
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
            style: { width: '275px', height: '150px', }
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => {return (getLevelableAmount("pet", 401).gte(6) || getLevelableTier("pet", 401).gte(1)) ? "" : getLevelableAmount("pet", 401).gte(3) ? "You will unlock the next button at level 6!" : "You will unlock the next button at level 3!"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Dotknight Level: x<h3>" + format(player.ep0.dotknightLevelEffect) + "</h3>."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 11],
                    ["clickable", 12],
                    ["clickable", 13],
                    ["clickable", 99],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ep0.dotknightPoints) + "</h3> dotknight points." }, {color: "white", fontSize: "32px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 401).gte(1) || getLevelableTier("pet", 401).gte(1)) }
})
addLayer("ep1", {
    name: "Dragon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dr", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dragonPoints: new Decimal(0),
        dragonLevelEffect: new Decimal(1),
        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(1),
                base: new Decimal(0.2),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(3),
                base: new Decimal(0.5),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(8),
                base: new Decimal(1),
            },
        },
    }},
    nodeStyle: {
        backgroundColor: "#689b3a",
    },
    tooltip: "Dragon",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        let amt = getLevelableAmount("pet", 402).add(getLevelableTier("pet", 402).mul(5).min(40))
        player.ep1.dragonLevelEffect = amt.pow(1.15).div(14).mul(getLevelableTier("pet", 402).add(1)).add(1)

        player.ep1.timers[0].base = new Decimal(0.2)
        player.ep1.timers[1].base = new Decimal(0.5)
        player.ep1.timers[2].base = new Decimal(1)
        for (let thing in player.ep1.timers) {
            player.ep1.timers[thing].base = player.ep1.timers[thing].base.mul(player.ep1.dragonLevelEffect)
            if (hasUpgrade("ep0", 13)) player.ep1.timers[thing].base = player.ep1.timers[thing].base.mul(upgradeEffect("ep0", 13))
            if (hasUpgrade("ep2", 10)) player.ep1.timers[thing].base = player.ep1.timers[thing].base.mul(upgradeEffect("ep2", 10))
            if (hasUpgrade("ev8", 21)) player.ep1.timers[thing].base = player.ep1.timers[thing].base.mul(1.4)
        }

        player.ep1.timers[0].max = new Decimal(1)
        player.ep1.timers[1].max = new Decimal(3)
        player.ep1.timers[2].max = new Decimal(8)
        for (let thing in player.ep1.timers) {
            player.ep1.timers[thing].current = player.ep1.timers[thing].current.sub(onepersec.mul(delta))
        }
    },
    clickables: {
        11: {
            title() { return player.ep1.timers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.timers[0].current) + "." : "<h3>+" + format(player.ep1.timers[0].base) + " Dragon Points."},
            canClick() { return player.ep1.timers[0].current.lt(0) },
            unlocked: true,
            tooltip() { return "Paragon Shard Rarity: 0.04%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.timers[0].base)
                player.ep1.timers[0].current = player.ep1.timers[0].max

                    let random = getRandomInt(2500)
                    if (random == 1)
                    {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        doPopup("none", "+1 Paragon Shard! (0.04%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.04);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep1.timers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.timers[1].current) + "." : "<h3>+" + format(player.ep1.timers[1].base) + " Dragon Points."},
            canClick() { return player.ep1.timers[1].current.lt(0) && this.unlocked() },
            unlocked() { return getLevelableAmount("pet", 402).gte(2) || getLevelableTier("pet", 402).gte(1)},
            tooltip() { return "Paragon Shard Rarity: 0.1%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.timers[1].base)
                player.ep1.timers[1].current = player.ep1.timers[1].max

                    let random = getRandomInt(1000)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        doPopup("none", "+1 Paragon Shard! (0.1%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.1);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep1.timers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.timers[2].current) + "." : "<h3>+" + format(player.ep1.timers[2].base) + " Dragon Points."},
            canClick() { return player.ep1.timers[2].current.lt(0) && this.unlocked() },
            unlocked() { return getLevelableAmount("pet", 402).gte(7) || getLevelableTier("pet", 402).gte(1)},
            tooltip() { return "Paragon Shard Rarity: 0.2%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.timers[2].base)
                player.ep1.timers[2].current = player.ep1.timers[2].max

                    let random = getRandomInt(500)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        doPopup("none", "+1 Paragon Shard! (0.2%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.2);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        99: {
            title() {return "Claim All"},
            canClick() {return tmp.ep1.clickables[11].canClick || tmp.ep1.clickables[12].canClick || tmp.ep1.clickables[13].canClick},
            unlocked() {return getLevelableAmount("pet", 402).gte(2) || getLevelableTier("pet", 402).gte(1)},
            onClick() {
                clickClickable("ep1", 11)
                clickClickable("ep1", 12)
                clickClickable("ep1", 13)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#cb79ed" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    upgrades: {
        11: {
            title: "Dragon Upgrade I",
            unlocked() { return true },
            description() { return "Boosts crystals based on dragon points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.5).div(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Dragon Upgrade II",
            unlocked() { return true },
            description() { return "Boosts AD tickspeed base based on dragon points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.15).div(70).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Dragon Upgrade III",
            unlocked() { return true },
            description() { return "Boosts cookies per second based on dragon points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.add(1).log(2).mul(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dragon Starmetal"
            },
            display() {
                return 'which are boosting starmetal alloy gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dragon Emotions"
            },
            display() {
                return 'which are boosting happiness, sadness, anger, and fear gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dragon Dotknights"
            },
            display() {
                return 'which are boosting dotknight point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
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
            style: { width: '275px', height: '150px', }
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => {return (getLevelableAmount("pet", 402).gte(7) || getLevelableTier("pet", 402).gte(1)) ? "" : getLevelableAmount("pet", 402).gte(2) ? "You will unlock the next button at level 7!" : "You will unlock the next button at level 2!"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Dragon Level: x<h3>" + format(player.ep1.dragonLevelEffect) + "</h3>."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 11],
                    ["clickable", 12],
                    ["clickable", 13],
                    ["clickable", 99],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.ep1.dragonPoints) + "</h3> dragon points."}, {color: "white", fontSize: "32px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 402).gte(1) || getLevelableTier("pet", 402).gte(1)) }
})
addLayer("ep3", {
    name: "Kres", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Kr", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        kresPoints: new Decimal(0),
        kresPointsMax: new Decimal(100),
        kresPointsPerSecond: new Decimal(0),

        kresStats: [new Decimal(7), new Decimal(8), new Decimal(5)]
    }},
    nodeStyle: {
        backgroundColor: "#910a27",
    },
    tooltip: "Kres",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep3.kresPointsMax = new Decimal(100)
        player.ep3.kresPointsMax = player.ep3.kresPointsMax.add(buyableEffect("ep3", 11))

        let amt = getLevelableAmount("pet", 404).add(getLevelableTier("pet", 404).mul(5).min(40))
        player.ep3.kresPointsPerSecond = amt.pow(1.1).div(10).mul(getLevelableTier("pet", 404).add(1))
        player.ep3.kresPoints = player.ep3.kresPoints.add(player.ep3.kresPointsPerSecond.mul(delta))

        if (player.ep3.kresPoints.gte(player.ep3.kresPointsMax)) {
            player.ep3.kresPoints = player.ep3.kresPointsMax
        }

        player.ep3.kresStats = [new Decimal(7), new Decimal(8), new Decimal(5)]
        player.ep3.kresStats[0] = player.ep3.kresStats[0].add(buyableEffect("ep3", 1))
        player.ep3.kresStats[1] = player.ep3.kresStats[1].add(buyableEffect("ep3", 2))
        player.ep3.kresStats[2] = player.ep3.kresStats[2].add(buyableEffect("ep3", 3))
        player.ep3.kresStats[0] = player.ep3.kresStats[0].add(buyableEffect("ma", 11))
        player.ep3.kresStats[1] = player.ep3.kresStats[1].add(buyableEffect("ma", 12))
        player.ep3.kresStats[2] = player.ep3.kresStats[2].add(buyableEffect("ma", 13))
    },
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Strength"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
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
            style: {width: "175px", height: "120px"},
        },
        2: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Defense"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
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
            style: {width: "175px", height: "120px"},
        },
        3: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Agility"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
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
            style: {width: "175px", height: "120px"},
        },
        
        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep3.kresPoints},
            pay() { player.ep3.kresPoints = player.ep3.kresPoints.sub(player.ep3.kresPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep3.kresPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser"
            },
            display() {
                return 'which are boosting kres point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Kres Points'
            },
            buy(mult) {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.03).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres XP"
            },
            display() {
                return 'which are boosting check back XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Epic Pets"
            },
            display() {
                return 'which are dividing epic pet fragmentation cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13]], {maxWidth: "900px"}],

                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Kres: Warrior Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep3.kresStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep3.kresStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep3.kresStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3]], {maxWidth: "900px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep3.kresPoints) + "/" + format(player.ep3.kresPointsMax) + "</h3> kres points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep3.kresPointsPerSecond) + "</h3> kres points per second. (based on level/ascension)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 404).gte(1) || getLevelableTier("pet", 404).gte(1)) }
})
addLayer("ep4", {
    name: "Nav", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Na", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        navPoints: new Decimal(0),
        navPointsMax: new Decimal(100),
        navPointsPerSecond: new Decimal(0),
        navLevelEffect: new Decimal(1),

        navStats: [new Decimal(9), new Decimal(6), new Decimal(5)]
    }},
    nodeStyle: {
        backgroundColor: "#710a91",
    },
    tooltip: "Nav",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep4.navPointsMax = new Decimal(100)
        player.ep4.navPointsMax = player.ep4.navPointsMax.add(buyableEffect("ep4", 11))

        let amt = getLevelableAmount("pet", 405).add(getLevelableTier("pet", 405).mul(5).min(40))
        player.ep4.navPointsPerSecond = amt.pow(1.1).div(10).mul(getLevelableTier("pet", 405).add(1))
        player.ep4.navPoints = player.ep4.navPoints.add(player.ep4.navPointsPerSecond.mul(delta))

        if (player.ep4.navPoints.gte(player.ep4.navPointsMax)) {
            player.ep4.navPoints = player.ep4.navPointsMax
        }

        player.ep4.navStats = [new Decimal(7), new Decimal(6), new Decimal(7)]
        player.ep4.navStats[0] = player.ep4.navStats[0].add(buyableEffect("ep4", 1))
        player.ep4.navStats[1] = player.ep4.navStats[1].add(buyableEffect("ep4", 2))
        player.ep4.navStats[2] = player.ep4.navStats[2].add(buyableEffect("ep4", 3))
        player.ep4.navStats[0] = player.ep4.navStats[0].add(buyableEffect("ma", 11))
        player.ep4.navStats[1] = player.ep4.navStats[1].add(buyableEffect("ma", 12))
        player.ep4.navStats[2] = player.ep4.navStats[2].add(buyableEffect("ma", 13))
    },
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Strength"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
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
            style: {width: "175px", height: "120px"},
        },
        2: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Defense"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
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
            style: {width: "175px", height: "120px"},
        },
        3: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Agility"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
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
            style: {width: "175px", height: "120px"},
        },

        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep4.navPoints},
            pay() { player.ep4.navPoints = player.ep4.navPoints.sub(player.ep4.navPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep4.navPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser"
            },
            display() {
                return 'which are boosting nav point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Nav Points'
            },
            buy(mult) {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Pet Points"
            },
            display() {
                return 'which are boosting pet point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Singularity Fragments"
            },
            display() {
                return 'which are dividing singularity fragmentation cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Nav: Mage Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep4.navStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep4.navStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep4.navStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3]], {maxWidth: "900px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },

        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep4.navPoints) + "/" + format(player.ep4.navPointsMax) + "</h3> nav points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep4.navPointsPerSecond) + "</h3> nav points per second. (based on level/ascension)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 405).gte(1) || getLevelableTier("pet", 405).gte(1)) }
})
addLayer("ep5", {
    name: "Sel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Se", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        selPoints: new Decimal(0),
        selPointsMax: new Decimal(100),
        selPointsPerSecond: new Decimal(0),
        selLevelEffect: new Decimal(1),

        selStats: [new Decimal(6), new Decimal(6), new Decimal(8)]
    }},
    nodeStyle: {
        backgroundColor: "#065c19",
    },
    tooltip: "Sel",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep5.selPointsMax = new Decimal(100)
        player.ep5.selPointsMax = player.ep5.selPointsMax.add(buyableEffect("ep5", 11))

        let amt = getLevelableAmount("pet", 406).add(getLevelableTier("pet", 406).mul(5).min(40))
        player.ep5.selPointsPerSecond = amt.pow(1.1).div(10).mul(getLevelableTier("pet", 406).add(1))
        player.ep5.selPoints = player.ep5.selPoints.add(player.ep5.selPointsPerSecond.mul(delta))

        if (player.ep5.selPoints.gte(player.ep5.selPointsMax)) {
            player.ep5.selPoints = player.ep5.selPointsMax
        }

        player.ep5.selStats = [new Decimal(6), new Decimal(6), new Decimal(8)]
        player.ep5.selStats[0] = player.ep5.selStats[0].add(buyableEffect("ep5", 1))
        player.ep5.selStats[1] = player.ep5.selStats[1].add(buyableEffect("ep5", 2))
        player.ep5.selStats[2] = player.ep5.selStats[2].add(buyableEffect("ep5", 3))
        player.ep5.selStats[0] = player.ep5.selStats[0].add(buyableEffect("ma", 11))
        player.ep5.selStats[1] = player.ep5.selStats[1].add(buyableEffect("ma", 12))
        player.ep5.selStats[2] = player.ep5.selStats[2].add(buyableEffect("ma", 13))
    },
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Strength"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
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
            style: {width: "175px", height: "120px"},
        },
        2: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Defense"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
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
            style: {width: "175px", height: "120px"},
        },
        3: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Agility"
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
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
            style: {width: "175px", height: "120px"},
        },

        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep5.selPoints},
            pay() { player.ep5.selPoints = player.ep5.selPoints.sub(player.ep5.selPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep5.selPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser"
            },
            display() {
                return 'which are boosting sel point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Sel Points'
            },
            buy(mult) {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.65).mul(0.035).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel XPBoost"
            },
            display() {
                return 'which are boosting XPBoost gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel XPBoost Cooldown"
            },
            display() {
                return 'which are dividing XPBoost button cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Sel: Ranger Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep5.selStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep5.selStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep5.selStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3]], {maxWidth: "900px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep5.selPoints) + "/" + format(player.ep5.selPointsMax) + "</h3> sel points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep5.selPointsPerSecond) + "</h3> sel points per second. (based on level/ascension)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 406).gte(1) || getLevelableTier("pet", 406).gte(1)) }
})