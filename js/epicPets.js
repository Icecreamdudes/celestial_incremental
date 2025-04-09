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
            title() { return getLevelableAmount("pet", 403).gt(0) ? "<img src='resources/cookieEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 403).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep2"
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
            canClick() { return player.ep0.dotknightPointButtonTimers[0].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep0.dotknightPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[1]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[1].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep0.dotknightPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[2]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[2].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
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
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep0.dotknightUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dotknight Level: x<h3>" + format(player.ep0.dotknightLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep0.dotknightPoints) + "</h3> dotknight points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
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
            canClick() { return player.ep1.dragonPointButtonTimers[0].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep1.dragonPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[1]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[1].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep1.dragonPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[2]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[2].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
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
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep1.dragonUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dragon Level: x<h3>" + format(player.ep1.dragonLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep1.dragonPoints) + "</h3> dragon points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
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
            title() { return getLevelableAmount("pet", 401).gt(0) ? "<img src='resources/dotknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return getLevelableAmount("pet", 401).gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep2.cookiePointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[0]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[0]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[0].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ep2.cookiePointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[1]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[1]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[1].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ep2.cookiePointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[2]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[2]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[2].lt(0) },
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
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
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
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep2.cookieUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Cookie Level: x<h3>" + format(player.ep2.cookieLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep2.cookiePoints) + "</h3> cookie points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
