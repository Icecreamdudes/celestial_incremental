addLayer("ep0", {
    name: "Ep0", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP0", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dotknightPoints: new Decimal(0),
        dotknightLevelEffect: new Decimal(1),
        dotknightPointsToGet: [new Decimal(1), new Decimal(3), new Decimal(8),],
        dotknightPointButtonUnlocks: [false, false, false,],
        dotknightPointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        dotknightPointButtonTimersMax: [new Decimal(60), new Decimal(240), new Decimal(600),],

        dotknightUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Dotknight",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep0.dotknightLevelEffect = getLevelableAmount("pet", 401).pow(1.1).div(10).add(1)

        player.ep0.dotknightPointsToGet = [new Decimal(1), new Decimal(3), new Decimal(8),]
        for (let i = 0; i < player.ep0.dotknightPointsToGet.length; i++)
        {
            player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(player.ep0.dotknightLevelEffect)
            if (hasUpgrade("ep2", 13)) player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(upgradeEffect("ep2", 13))
            if (hasUpgrade("ev8", 21)) player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(1.4)
            player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(buyableEffect("ep1", 13))
        }

        for (let i = 0; i < player.ep0.dotknightPointButtonTimers.length; i++)
        {
            player.ep0.dotknightPointButtonTimers[i] = player.ep0.dotknightPointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep0.dotknightPointButtonTimersMax = [new Decimal(60), new Decimal(240), new Decimal(600),]

        if (getLevelableAmount("pet", 401).gte(1))
        {
            player.ep0.dotknightPointButtonUnlocks[0] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level 3!"
        }
        if (getLevelableAmount("pet", 401).gte(3))
        {
            player.ep0.dotknightPointButtonUnlocks[1] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level 6!"
        }
        if (getLevelableAmount("pet", 401).gte(6))
        {
            player.ep0.dotknightPointButtonUnlocks[2] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level ???"
        }
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 406).gt(0) ? "<img src='resources/selEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 406).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep5"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 402).gt(0) ? "<img src='resources/dragonEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 402).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep1"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep0.dotknightPointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[0]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[0]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[0].lt(0) && this.unlocked() },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[0] },
            tooltip() { return "Evo Shard Rarity: 1%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[0])
                player.ep0.dotknightPointButtonTimers[0] = player.ep0.dotknightPointButtonTimersMax[0]

                    let random = getRandomInt(100)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (1%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(1);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep0.dotknightPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[1]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[1] },
            tooltip() { return "Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[1])
                player.ep0.dotknightPointButtonTimers[1] = player.ep0.dotknightPointButtonTimersMax[1]

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (2%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(2);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep0.dotknightPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[2]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[2] },
            tooltip() { return "DOUBLE Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[2])
                player.ep0.dotknightPointButtonTimers[2] = player.ep0.dotknightPointButtonTimersMax[2]

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained 2 Evolution Shards! (2%)", "resources/evoShard.png");
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
            unlocked() {return player.ep0.dotknightPointButtonUnlocks[1]},
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
    bars: {
    },
    upgrades: {
        11:
        {
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
            style: { width: '150px', height: '100px', }
        },
        12:
        {
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
            style: { width: '150px', height: '100px', }
        },
        13:
        {
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
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Scraps"
            },
            display() {
                return 'which are boosting main core scrap gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Offerings"
            },
            display() {
                return 'which are boosting offering gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dotknight Cookies"
            },
            display() {
                return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "10px"],
                    ["raw-html", function () { return player.ep0.dotknightUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dotknight Level: x<h3>" + format(player.ep0.dotknightLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
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
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep0.dotknightPoints) + "</h3> dotknight points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 401).gte(1) }
})
addLayer("ep1", {
    name: "Ep1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dragonPoints: new Decimal(0),
        dragonLevelEffect: new Decimal(1),
        dragonPointsToGet: [new Decimal(0.04), new Decimal(0.1), new Decimal(0.2),],
        dragonPointButtonUnlocks: [false, false, false,],
        dragonPointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        dragonPointButtonTimersMax: [new Decimal(1), new Decimal(3), new Decimal(8),],

        dragonUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Dragon",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep1.dragonLevelEffect = getLevelableAmount("pet", 402).pow(1.15).div(14).add(1)

        player.ep1.dragonPointsToGet = [new Decimal(0.2), new Decimal(0.45), new Decimal(0.9),]
        for (let i = 0; i < player.ep1.dragonPointsToGet.length; i++)
        {
            player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(player.ep1.dragonLevelEffect)
            if (hasUpgrade("ep0", 13)) player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(upgradeEffect("ep0", 13))
            if (hasUpgrade("ev8", 21)) player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(1.4)
            player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(buyableEffect("ep2", 13))
        }

        for (let i = 0; i < player.ep1.dragonPointButtonTimers.length; i++)
        {
            player.ep1.dragonPointButtonTimers[i] = player.ep1.dragonPointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep1.dragonPointButtonTimersMax = [new Decimal(1), new Decimal(3), new Decimal(8),]

        if (getLevelableAmount("pet", 402).gte(1))
        {
            player.ep1.dragonPointButtonUnlocks[0] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level 2!"
        }
        if (getLevelableAmount("pet", 402).gte(2))
        {
            player.ep1.dragonPointButtonUnlocks[1] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level 7!"
        }
        if (getLevelableAmount("pet", 402).gte(7))
        {
            player.ep1.dragonPointButtonUnlocks[2] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level ???"
        }
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 401).gt(0) ? "<img src='resources/dotknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 401).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 403).gt(0) ? "<img src='resources/cookieEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 403).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep2"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep1.dragonPointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[0]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[0]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[0].lt(0) && this.unlocked() },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[0] },
            tooltip() { return "Paragon Shard Rarity: 0.04%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[0])
                player.ep1.dragonPointButtonTimers[0] = player.ep1.dragonPointButtonTimersMax[0]

                    let random = getRandomInt(2500)
                    if (random == 1)
                    {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained an Paragon Shard! (0.04%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.04);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep1.dragonPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[1]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[1] },
            tooltip() { return "Paragon Shard Rarity: 0.1%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[1])
                player.ep1.dragonPointButtonTimers[1] = player.ep1.dragonPointButtonTimersMax[1]

                    let random = getRandomInt(1000)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained an Paragon Shard! (0.1%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.1);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep1.dragonPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[2]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[2] },
            tooltip() { return "Paragon Shard Rarity: 0.2%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[2])
                player.ep1.dragonPointButtonTimers[2] = player.ep1.dragonPointButtonTimersMax[2]

                    let random = getRandomInt(500)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained a Paragon Shard! (0.2%)", "resources/paragonShard.png");
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
            unlocked() {return player.ep1.dragonPointButtonUnlocks[1]},
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
    bars: {
    },
    upgrades: {
        11:
        {
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
            style: { width: '150px', height: '100px', }
        },
        12:
        {
            title: "Dragon Upgrade II",
            unlocked() { return true },
            description() { return "Boosts tickspeed base based on dragon points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.15).div(70).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Dragon Upgrade III",
            unlocked() { return true },
            description() { return "Boosts cookie points based on dragon points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
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
            purchaseLimit() { return new Decimal(100) },
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
            purchaseLimit() { return new Decimal(100) },
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
                return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "10px"],
                    ["raw-html", function () { return player.ep1.dragonUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dragon Level: x<h3>" + format(player.ep1.dragonLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
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
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep1.dragonPoints) + "</h3> dragon points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 402).gte(1) }
})
addLayer("ep2", {
    name: "Ep2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cookiePoints: new Decimal(0),
        cookieLevelEffect: new Decimal(1),
        cookiePointsToGet: [new Decimal(10), new Decimal(25), new Decimal(60),],
        cookiePointButtonUnlocks: [false, false, false,],
        cookiePointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        cookiePointButtonTimersMax: [new Decimal(600), new Decimal(1500), new Decimal(4000),],

        cookieUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Cookie",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep2.cookieLevelEffect = getLevelableAmount("pet", 403).pow(1.12).div(12).add(1)

        player.ep2.cookiePointsToGet = [new Decimal(10), new Decimal(25), new Decimal(60),]
        for (let i = 0; i < player.ep2.cookiePointsToGet.length; i++)
        {
            player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(player.ep2.cookieLevelEffect)
            if (hasUpgrade("ep1", 13)) player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(upgradeEffect("ep1", 13))
            if (hasUpgrade("ev8", 21)) player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(1.4)
            player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(buyableEffect("ep0", 13))
        }

        for (let i = 0; i < player.ep2.cookiePointButtonTimers.length; i++)
        {
            player.ep2.cookiePointButtonTimers[i] = player.ep2.cookiePointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep2.cookiePointButtonTimersMax = [new Decimal(600), new Decimal(1500), new Decimal(4000),]

        if (getLevelableAmount("pet", 403).gte(1))
        {
            player.ep2.cookiePointButtonUnlocks[0] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level 2!"
        }
        if (getLevelableAmount("pet", 403).gte(2))
        {
            player.ep2.cookiePointButtonUnlocks[1] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level 7!"
        }
        if (getLevelableAmount("pet", 403).gte(7))
        {
            player.ep2.cookiePointButtonUnlocks[2] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level ???"
        }
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 402).gt(0) ? "<img src='resources/dragonEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 402).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep1"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 404).gt(0) ? "<img src='resources/kresEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 404).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep2.cookiePointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[0]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[0]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[0].lt(0) && this.unlocked() },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[0] },
            tooltip() { return "Evolution Shard Rarity: 10%<br>Paragon Shard Rarity: 1%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[0])
                player.ep2.cookiePointButtonTimers[0] = player.ep2.cookiePointButtonTimersMax[0]

                let random = getRandomInt(10)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    player.cb.pityEvoCurrent = new Decimal(0);
                    callAlert("You gained an Evolution Shard! (10%)", "resources/evoShard.png");
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(10);
                }

                let random1 = getRandomInt(100)
                if (random1 == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    callAlert("You gained a Paragon Shard! (1%)", "resources/paragonShard.png");
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(1);
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep2.cookiePointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[1]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[1]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[1] },
            tooltip() { return "Evolution Shard Rarity: 20%<br>Paragon Shard Rarity: 2.5%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[1])
                player.ep2.cookiePointButtonTimers[1] = player.ep2.cookiePointButtonTimersMax[1]

                let random = getRandomInt(5)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    player.cb.pityEvoCurrent = new Decimal(0);
                    callAlert("You gained an Evolution Shard! (20%)", "resources/evoShard.png");
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(20);
                }

                let random1 = getRandomInt(40)
                if (random1 == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    callAlert("You gained a Paragon Shard! (2.5%)", "resources/paragonShard.png");
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(2.5);
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep2.cookiePointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[2]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[2]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[2] },
            tooltip() { return "Evolution Shard Rarity: 33%<br>Paragon Shard Rarity: 4%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[2])
                player.ep2.cookiePointButtonTimers[2] = player.ep2.cookiePointButtonTimersMax[2]

                    let random = getRandomInt(3)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (33%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(33);
                    }

                    let random1 = getRandomInt(25)
                    if (random1 == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained a Paragon Shard! (4%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(4);
                    }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },

        99: {
            title() {return "Claim All"},
            canClick() {return tmp.ep2.clickables[11].canClick || tmp.ep2.clickables[12].canClick || tmp.ep2.clickables[13].canClick},
            unlocked() {return player.ep2.cookiePointButtonUnlocks[1] },
            onClick() {
                clickClickable("ep2", 11)
                clickClickable("ep2", 12)
                clickClickable("ep2", 13)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#cb79ed" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Cookie Upgrade I",
            unlocked() { return true },
            description() { return "Boosts dimension boost base based on cookie points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(0.15).div(80).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        12:
        {
            title: "Cookie Upgrade II",
            unlocked() { return true },
            description() { return "Boosts challenge dice points based on cookie points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(1.1).div(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Cookie Upgrade III",
            unlocked() { return true },
            description() { return "Boosts dotknight points based on cookie points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep2.cookiePoints},
            pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cookie Moonstone"
            },
            display() {
                return 'which are boosting moonstone gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
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
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep2.cookiePoints},
            pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(3).pow(2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cookie Grass-Skippers"
            },
            display() {
                return 'which are boosting grass-skipper gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
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
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep2.cookiePoints},
            pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cookie Dragons"
            },
            display() {
                return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
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
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "10px"],
                    ["raw-html", function () { return player.ep2.cookieUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Cookie Level: x<h3>" + format(player.ep2.cookieLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
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
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep2.cookiePoints) + "</h3> cookie points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 403).gte(1) }
})
addLayer("ep3", {
    name: "Ep3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP3", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        kresPoints: new Decimal(0),
        kresPointsMax: new Decimal(100),
        kresPointsPerSecond: new Decimal(0),

        kresStats: [new Decimal(7), new Decimal(8), new Decimal(5)]
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Kres",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep3.kresPointsMax = new Decimal(100)
        player.ep3.kresPointsMax = player.ep3.kresPointsMax.add(buyableEffect("ep3", 11))

        player.ep3.kresPointsPerSecond = getLevelableAmount("pet", 404).pow(1.1).div(10)
        player.ep3.kresPoints = player.ep3.kresPoints.add(player.ep3.kresPointsPerSecond.mul(delta))

        if (player.ep3.kresPoints.gte(player.ep3.kresPointsMax)) {
            player.ep3.kresPoints = player.ep3.kresPointsMax
        }

        player.ep3.kresStats = [new Decimal(7), new Decimal(8), new Decimal(5)]
        player.ep3.kresStats[0] = player.ep3.kresStats[0].add(buyableEffect("ep3", 1))
        player.ep3.kresStats[1] = player.ep3.kresStats[1].add(buyableEffect("ep3", 2))
        player.ep3.kresStats[2] = player.ep3.kresStats[2].add(buyableEffect("ep3", 3))
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 403).gt(0) ? "<img src='resources/cookieEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 403).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep2"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 405).gt(0) ? "<img src='resources/navknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 405).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep4"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        2: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        3: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
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
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],

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
                    ["row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep3.kresPoints) + "/" + format(player.ep3.kresPointsMax) + "</h3> kres points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep3.kresPointsPerSecond) + "</h3> kres points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 404).gte(1) }
})
addLayer("ep4", {
    name: "Ep4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP4", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    automate() {},
    nodeStyle() {},
    tooltip: "Nav",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep4.navPointsMax = new Decimal(100)
        player.ep4.navPointsMax = player.ep4.navPointsMax.add(buyableEffect("ep4", 11))

        player.ep4.navPointsPerSecond = getLevelableAmount("pet", 405).pow(1.1).div(10)
        player.ep4.navPoints = player.ep4.navPoints.add(player.ep4.navPointsPerSecond.mul(delta))

        if (player.ep4.navPoints.gte(player.ep4.navPointsMax)) {
            player.ep4.navPoints = player.ep4.navPointsMax
        }

        player.ep4.navStats = [new Decimal(7), new Decimal(6), new Decimal(7)]
        player.ep4.navStats[0] = player.ep4.navStats[0].add(buyableEffect("ep4", 1))
        player.ep4.navStats[1] = player.ep4.navStats[1].add(buyableEffect("ep4", 2))
        player.ep4.navStats[2] = player.ep4.navStats[2].add(buyableEffect("ep4", 3))
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 404).gt(0) ? "<img src='resources/kresEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 404).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 406).gt(0) ? "<img src='resources/selknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 406).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep5"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        2: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        3: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
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
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
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
                    ["row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },

        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep4.navPoints) + "/" + format(player.ep4.navPointsMax) + "</h3> nav points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep4.navPointsPerSecond) + "</h3> nav points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 405).gte(1) }
})
addLayer("ep5", {
    name: "Ep5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP5", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    automate() {},
    nodeStyle() {},
    tooltip: "Sel",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep5.selPointsMax = new Decimal(100)
        player.ep5.selPointsMax = player.ep5.selPointsMax.add(buyableEffect("ep5", 11))

        player.ep5.selPointsPerSecond = getLevelableAmount("pet", 406).pow(1.1).div(10)
        player.ep5.selPoints = player.ep5.selPoints.add(player.ep5.selPointsPerSecond.mul(delta))

        if (player.ep5.selPoints.gte(player.ep5.selPointsMax)) {
            player.ep5.selPoints = player.ep5.selPointsMax
        }

        player.ep5.selStats = [new Decimal(6), new Decimal(6), new Decimal(8)]
        player.ep5.selStats[0] = player.ep5.selStats[0].add(buyableEffect("ep5", 1))
        player.ep5.selStats[1] = player.ep5.selStats[1].add(buyableEffect("ep5", 2))
        player.ep5.selStats[2] = player.ep5.selStats[2].add(buyableEffect("ep5", 3))
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return getLevelableAmount("pet", 405).gt(0) ? "<img src='resources/navEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 405).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return getLevelableAmount("pet", 401).gt(0) ? "<img src='resources/dotknightknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 401).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        2: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
        },
        3: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
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
            style: { width: '175px', height: '100px', }
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
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
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
                    ["row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep5.selPoints) + "/" + format(player.ep5.selPointsMax) + "</h3> sel points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep5.selPointsPerSecond) + "</h3> sel points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && getLevelableAmount("pet", 406).gte(1) }
})