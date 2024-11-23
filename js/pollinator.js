addLayer("pol", {
    name: "Pollinators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        pollinators: new Decimal(0),
        pollinatorsPerSecond: new Decimal(0),

        pollinatorsEffect: [new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        pollinatorsIndex: 0,
        pollinatorsText: "",
        pollinatorsMax: false
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Pollinators",
    color: "#cb8e00",

    update(delta) {
        let onepersec = new Decimal(1)

        if (hasUpgrade("i", 22)) {
            player.pol.pollinatorsPerSecond = player.g.grass.add(1).log(10).pow(0.75).div(3)
            if (hasUpgrade("pol", 11)) { player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("pol", 11)) }
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 12))
            if (hasUpgrade("g", 23)) { player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("g", 23)) }
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("cb", 15))
            if (player.pol.pollinators.gt(1e10)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.pow(0.9)
            player.pol.pollinators = player.pol.pollinators.add(player.pol.pollinatorsPerSecond.mul(delta))
            if (player.pol.pollinators.lt(player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1))) {
                player.pol.pollinators = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1)
            }
        }

        switch (player.pol.pollinatorsIndex) {
            case 0:
                player.pol.pollinatorsText = "<h1>You are currently selecting nothing.";
                break;
            case 1:
                player.pol.pollinatorsEffect = [
                    player.pol.pollinators.pow(2.75).div(10).add(1).pow(buyableEffect("pol", 14)), // Celestial Points
                    player.pol.pollinators.log(10).add(1).pow(buyableEffect("pol", 14)), // Factor Base
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Beetle.";
                break;
            case 2:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0),
                    player.pol.pollinators.pow(3).div(10).add(1).pow(buyableEffect("pol", 14)), // Factor Power
                    player.pol.pollinators.pow(3.25).div(10).add(1).pow(buyableEffect("pol", 14)), // Prestige Points
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Fly.";
                break;
            case 3:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(3.25).div(10).add(1).pow(buyableEffect("pol", 14)), // Leafs
                    player.pol.pollinators.pow(3).div(10).add(1).pow(buyableEffect("pol", 14)), // Trees
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Bat.";
                break;
            case 4:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(2.25).div(10).add(1).pow(buyableEffect("pol", 14)), // Grass Value
                    player.pol.pollinators.pow(0.5).div(10).add(1).pow(buyableEffect("pol", 14)), // Golden Grass Value
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting Wind.";
                break;
            case 5:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(0.8).div(10).add(1).pow(buyableEffect("pol", 14)), // Grasshoppers
                    player.pol.pollinators.pow(1.5).div(10).add(1).pow(buyableEffect("pol", 14)), // Fertilizer
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Bee.";
                break;
            case 6:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(2.5).div(10).add(1).pow(buyableEffect("pol", 14)), // Lines of Code
                    player.pol.pollinators.pow(2.25).div(10).add(1).pow(buyableEffect("pol", 14)), // Mods
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Butterfly.";
                break;
            case 7:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.log(10).mul(1.5).add(1).pow(buyableEffect("pol", 14)), // Dice Points
                    player.pol.pollinators.log(10).add(1).pow(buyableEffect("pol", 14)), // Rocket Fuel
                    player.pol.pollinators.log(100).add(1).pow(buyableEffect("pol", 14)), // All Hex Points
                    player.pol.pollinators.log(100).pow(0.5).div(2).add(1).pow(buyableEffect("pol", 14)) // Realm Mod Energy
                ];
                player.pol.pollinatorsText = "<h1>You are currently selecting the Ant.";
                break;
        }
    },
    branches: ["g", "gh"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.pol.pollinatorsMax == false },
            unlocked() { return hasUpgrade("pol", 13) },
            onClick() {
                player.pol.pollinatorsMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.pol.pollinatorsMax == true  },
            unlocked() { return hasUpgrade("pol", 13) },
            onClick() {
                player.pol.pollinatorsMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "❌"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 0
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#28242c", 'border-width': '4px' },
        },
        12: {
            title() { return "🪲"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 1
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#eaf6f7", 'border-width': '4px' },
        },
        13: {
            title() { return "🪰"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 2
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#31aeb0", 'border-width': '4px' },
        },
        14: {
            title() { return "🦇"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 3
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#0B6623", 'border-width': '4px' },
        },
        15: {
            title() { return "💨"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 12) },
            onClick() {
                player.pol.pollinatorsIndex = 4
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#119B35", 'border-width': '4px' },
        },
        16: {
            title() { return "🐝"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 14) },
            onClick() {
                player.pol.pollinatorsIndex = 5
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#19e04d", 'border-width': '4px' },
        },
        17: {
            title() { return "🦋"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 16) },
            onClick() {
                player.pol.pollinatorsIndex = 6
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#0951a6", 'border-width': '4px' },
        },
        18: {
            title() { return "🐜"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 18) },
            onClick() {
                player.pol.pollinatorsIndex = 7
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "linear-gradient(45deg, #8a00a9, #0061ff)", 'border-color': "purple", 'border-width': '4px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Pollinator Upgrade I",
            unlocked() { return true },
            description() { return "Boost pollinators per second based on pollinators." },
            cost: new Decimal(1000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
            effect() {
                return player.pol.pollinators.add(1).pow(new Decimal(0.1).add(buyableEffect("pol", 13))).div(4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Pollinator Upgrade II",
            unlocked() { return true },
            description() { return "Unlocks the wind pollinator." },
            cost: new Decimal(2500),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        13:
        {
            title: "Pollinator Upgrade III",
            unlocked() { return true },
            description() { return "Unlocks pollinator buyables." },
            cost: new Decimal(10000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        14:
        {
            title: "Pollinator Upgrade IV",
            unlocked() { return true },
            description() { return "Unlocks the bee pollinator." },
            cost: new Decimal(25000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        15:
        {
            title: "Pollinator Upgrade V",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks more pollinator buyables." },
            cost: new Decimal(100000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        16:
        {
            title: "Pollinator Upgrade VI",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks the butterfly pollinator." },
            cost: new Decimal(500000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        17:
        {
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
        },
        18:
        {
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
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).mul(2) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Promised Pollinators"
            },
            display() {
                return "which guarantees you have at least " + format(tmp[this.layer].buyables[this.id].effect) + " seconds worth of pollinators.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(2.25) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.25).add(1) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Plentiful Pollinators"
            },
            display() {
                return "which boosts pollinators per second by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(2.5) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.03) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Propagating Pollinators"
            },
            display() {
                return "which improves pollinator upgrade I's scaling by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(1000000) },
            costGrowth() { return new Decimal(10) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9).mul(0.05).add(1) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Potent Pollination"
            },
            display() {
                return "which boosts pollinator effects by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
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
        p0: {
            title: "None",
            body() { return "Fun Fact: Without pollinators, all terrestrial ecosystems will collapse." },
            unlocked() { return player.pol.pollinatorsIndex == 0},
        },
        p1: {
            title: "Beetle",
            body() { return "Fun Fact: Beetles pollinate close to 90% of all flowering plants." },
            unlocked() { return player.pol.pollinatorsIndex == 1},
        },
        p2: {
            title: "Fly",
            body() { return "Fun Fact: Flies are the dominant pollinator in alpine and subarctic environments." },
            unlocked() { return player.pol.pollinatorsIndex == 2},
        },
        p3: {
            title: "Bat",
            body() { return "Fun Fact: 300 species of fruit rely on bats for pollination. These include species of bananas, mangoes and durians." },
            unlocked() { return player.pol.pollinatorsIndex == 3},
        },
        p4: {
            title: "Wind",
            body() { return "Fun Fact: 12% of all flowering plants, including most grasses, are wind pollinated." },
            unlocked() { return player.pol.pollinatorsIndex == 4},
        },
        p5: {
            title: "Bee",
            body() { return "Fun Fact: A fourth of all food production relies on bee pollination." },
            unlocked() { return player.pol.pollinatorsIndex == 5},
        },
        p6: {
            title: "Butterfly",
            body() { return "Fun Fact: Butterflies tend to pollinate colorful plants. (Researchers don't study butterflies so this is all I got)" },
            unlocked() { return player.pol.pollinatorsIndex == 6},
        },
        p7: {
            title: "Ant",
            body() { return "Fun Fact: Ants are not very effective pollinators, but they still do it." },
            unlocked() { return player.pol.pollinatorsIndex == 7},
        }
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.pol.pollinatorsText }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 1 ? "<h2>Celestial Points: x" + format(player.pol.pollinatorsEffect[0]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 1 ? "<h2>Factor Base: x" + format(player.pol.pollinatorsEffect[1]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 2 ? "<h2>Factor Power: x" + format(player.pol.pollinatorsEffect[2]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 2 ? "<h2>Prestige Points: x" + format(player.pol.pollinatorsEffect[3]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 3 ? "<h2>Leafs: x" + format(player.pol.pollinatorsEffect[4]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 3 ? "<h2>Trees: x" + format(player.pol.pollinatorsEffect[5]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 4 ? "<h2>Grass Value: x" + format(player.pol.pollinatorsEffect[6]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 4 ? "<h2>Golden Grass Value: x" + format(player.pol.pollinatorsEffect[7]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 5 ? "<h2>Grasshoppers: x" + format(player.pol.pollinatorsEffect[8]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 5 ? "<h2>Fertilizer: x" + format(player.pol.pollinatorsEffect[9]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 6 ? "<h2>Lines of Code: x" + format(player.pol.pollinatorsEffect[10]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 6 ? "<h2>Mods: x" + format(player.pol.pollinatorsEffect[11]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.dice ? "<h2>Dice Points: x" + format(player.pol.pollinatorsEffect[12]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.rocketFuel ? "<h2>Rocket Fuel: x" + format(player.pol.pollinatorsEffect[13]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.hex ? "<h2>All Hex Points: x" + format(player.pol.pollinatorsEffect[14]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.realmMods ? "<h2>Realm Mod Energy: x" + format(player.pol.pollinatorsEffect[15]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14]]],
                    ["row", [["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18]]],
                    ["blank", "25px"],
                    ["row", [["infobox", "p0"], ["infobox", "p1"], ["infobox", "p2"], ["infobox", "p3"], ["infobox", "p4"], ["infobox", "p5"], ["infobox", "p6"], ["infobox", "p7"]]],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                    ["row", [["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12]]],
                    ["row", [["buyable", 13], ["buyable", 14]]]
                ]
            }
        },
    },

    tabFormat: [
        ["raw-html", function () { return "There are <h3>" + format(player.pol.pollinators) + "</h3> pollinators." }, { "color": "#cb8e00", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.pol.pollinatorsPerSecond) + "</h3> pollinators per second." }, { "color": "#cb8e00", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pol.pollinators.gt(1e10) ? "[SOFTCAPPED]" : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 22) && !(inChallenge("ip", 12) || inChallenge("ip", 18)) }
})
