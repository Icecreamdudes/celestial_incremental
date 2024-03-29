addLayer("ev", {
    name: "Evolution", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evolutionDisplayIndex: new Decimal(-1),
        evolutionDisplay: [],
        evolutionsUnlocked: [false],
        /*
        0 - Unsmith
        1 - Shark
        */
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "ev")
        {
            startRain('#4b79ff');
        }  else if (player.tab == "eva")
        {
            stopRain('#4b79ff');
        }

        player.ev.evolutionDisplay = [
            "Evolve Unsmith<br>" + formatWhole(player.cb.evolutionShards) + "/4 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[0]) + "/6 Gwa" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[1]) + "/6 Egg Guy" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[2]) + "/6 Unsmith" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[3]) + "/6 Gd Checkpoint" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[4]) + "/6 Slax" + 
            "<br>"  + formatWhole(player.cb.commonPetLevels[2]) + "/7 Unsmith Level" +
            "<br>"  + formatWhole(player.cb.highestDicePetCombo) + "/2 Highest Dice Pet Combo" 
        ]
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
                stopRain('#4b79ff');
            },
            style: { width: '100px', "min-height": '50px', 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', },
        },
        11: {
            title() { return player.cb.commonPetImage[2] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[0] },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        12: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(4) && player.cb.commonPetAmounts[0].gte(6) && player.cb.commonPetAmounts[1].gte(6) && player.cb.commonPetAmounts[2].gte(6) && player.cb.commonPetAmounts[3].gte(6) && player.cb.commonPetAmounts[4].gte(6) && player.cb.commonPetLevels[2].gte(7) && player.cb.highestDicePetCombo.gte(2)},
            unlocked() { return player.ev.evolutionDisplayIndex == 0 },
            onClick() {
                layers.ev.evolvePet(0)
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(4)
                player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].sub(6)
                player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].sub(6)
                player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].sub(6)
                player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].sub(6)
                player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].sub(6)

                player.ev.evolutionsUnlocked[0] = true
                player.cb.evolvedLevels[0] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%" },
        },
    },
    evolvePet(pet) {
        switch (pet)
        {
            case 0:
                flashScreen("white", ["Unsmith.", "Such an interesting specimen...", "It looks like it lacks power,", "But it's full of life.", "I will grant you with the evolution.", ""], "black", 3000);
                break;
        }
    },
    bars: {
    },
    upgrades: {
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
                buttonStyle() { return { 'color': '#1500bf', 'border-color': "#1500bf", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current Evolutions"}, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["raw-html", function () { return player.ev.evolutionDisplay[player.ev.evolutionDisplayIndex] }, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }], ["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return false }
})
addLayer("ev0", {
    name: "Goldsmith", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E0", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coinDust: new Decimal(0),
        coinDustEffect: new Decimal(1),
        coinDustPerSecond: new Decimal(0), 
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ev0.coinDust = player.ev0.coinDust.add(player.ev0.coinDustPerSecond.mul(delta))

        player.ev0.coinDustPerSecond = player.cb.evolvedEffects[0][1].div(3600)
        player.ev0.coinDustPerSecond = player.ev0.coinDustPerSecond.mul(buyableEffect("ev0", 11))

        if (player.ev0.coinDust.lt(1)) player.ev0.coinDustEffect = player.ev0.coinDust.mul(0.05).add(1)
        if (player.ev0.coinDust.gte(1)) player.ev0.coinDustEffect = player.ev0.coinDust.pow(0.3).mul(0.05).add(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
                stopRain('#4b79ff');
            },
            style: { width: '100px', "min-height": '50px', 'background-image': 'linear-gradient(90deg, #e7c97c, #fad25a)', },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Coin Dust Booster"
            },
            display() {
                return "which are boosting coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.1)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP Button Cool Down"
            },
            display() {
                return "which are dividing xp button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.25)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.6)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Rare Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(1.5)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

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
                buttonStyle() { return { 'color': '#655421', 'border-color': "#655421", 'background-image': 'linear-gradient(90deg, #e7c97c, #fad25a)',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ev0.coinDust) + "</h3> coin dust, which boosts check back xp gain by x" + format(player.ev0.coinDustEffect) + "." }, { "color": "#655421", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return player.ev0.coinDustPerSecond.lt(0.1) ? "You are gaining <h3>" + format(player.ev0.coinDustPerSecond.mul(3600)) + "</h3> coin dust per hour." : "You are gaining <h3>" + format(player.ev0.coinDustPerSecond) + "</h3> coin dust per second."  }, { "color": "#655421", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return false }
})
