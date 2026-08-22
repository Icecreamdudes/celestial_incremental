addLayer("pl", {
    name: "Planets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PL", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        planets: new Decimal(0),
        planetChance: new Decimal(0),

        starInput: new Decimal(0),
        starInputAmount: new Decimal(0),

        spaceDust: new Decimal(0),
        spaceDustCapacity: new Decimal(100),
        spaceDustPerSecond: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#99daff",
            color: "#eaf6f7",
        };
    },
    tooltip: "Planets",
    branches: ["st"],
    color: "#279ccf",
    update(delta) {
        let onepersec = new Decimal(1)

        player.pl.planetChance = Decimal.div(0.1, player.pl.planets.add(1))
        
        if (player.pl.starInput.gte(player.au2.stars)) player.pl.starInputAmount = player.au2.stars
        if (player.pl.starInput.gte(1) && player.pl.starInput.lt(player.au2.stars)) player.pl.starInputAmount = player.pl.starInput.floor()
        if (player.pl.starInput.lt(1)) player.pl.starInputAmount = new Decimal(1)

        if (player.pl.planets.lte(0)) { 
            player.pl.planets = new Decimal(0)
        }
        player.pl.planets = player.pl.planets.floor()

        player.pl.spaceDustCapacity = new Decimal(100)
        player.pl.spaceDustCapacity = player.pl.spaceDustCapacity.mul(buyableEffect("pl", 11))
        if (hasUpgrade("ir", 303)) player.pl.spaceDustCapacity = player.pl.spaceDustCapacity.mul(100);

        player.pl.spaceDust = player.pl.spaceDust.add(player.pl.spaceDustPerSecond.mul(delta))
        if (player.pl.spaceDust.gt(player.pl.spaceDustCapacity)) {
            player.pl.spaceDust = player.pl.spaceDustCapacity
        }

        player.pl.spaceDustPerSecond = player.pl.planets.mul(0.01).mul(player.pl.planets.pow(0.75).mul(0.1))
        if (hasMilestone("spaceZone1", 11)) player.pl.spaceDustPerSecond = player.pl.spaceDustPerSecond.mul(3);
        if (hasUpgrade("ir", 303)) player.pl.spaceDustPerSecond = player.pl.spaceDustPerSecond.mul(100);
        player.pl.spaceDustPerSecond = player.pl.spaceDustPerSecond.pow(levelableEffect("pet", 1209)[2])
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Sacrifice your stars" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                let starsToSacrifice = player.pl.starInputAmount;
                player.au2.stars = player.au2.stars.sub(starsToSacrifice);

                let planets = player.pl.planets;
                let stars = new Decimal(starsToSacrifice);

                if (starsToSacrifice.gt(100)) {
                    let preExp = starsToSacrifice.div(5).add(player.pl.planets.add(1).pow(2))
                    let gain = new Decimal(1)
                    if (preExp.gt(2e7)) {
                        gain = starsToSacrifice.mul(1e7).add(player.pl.planets.add(1).pow(4)).pow(0.25).sub(1).sub(player.pl.planets).max(0)
                    } else {
                        gain = preExp.pow(0.5).sub(player.pl.planets.add(1)).max(0)
                    }
                    let flooredGain = gain.floor();
                    let remainder = gain.sub(flooredGain).toNumber();

                    if (Math.random() < remainder) {
                        flooredGain = flooredGain.add(1);
                    }

                    player.pl.planets = player.pl.planets.add(flooredGain);
                } else {
                    // Simulate each star individually (random, slow)
                    let gained = new Decimal(0);
                    let currentPlanets = planets;
                    for (let i = 0; i < starsToSacrifice.toNumber(); i++) {
                        let chance = Decimal.div(0.1, currentPlanets.add(1)).toNumber();
                        if (Math.random() < chance) {
                            gained = gained.add(1);
                            currentPlanets = currentPlanets.add(1);
                        }
                    }
                    player.pl.planets = player.pl.planets.add(gained.floor());
                }
            },
            style: {width: "300px", minHeight: "50px", borderRadius: "0 15px 15px 0"},
        },
    },
    levelables: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1250) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.11, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser"
            },
            display() {
                return "which are boosting capacity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        12: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "XP Increaser"
            },
            display() {
                return "which are boosting check back XP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        13: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "XPBoost Increaser"
            },
            display() {
                return "which are boosting XPBoost gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        14: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Point Increaser"
            },
            display() {
                return "which are boosting pet point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        15: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return hasMilestone("spaceZone1", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rock Increaser"
            },
            display() {
                return "which are boosting space rock gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        16: {
            costBase() { return new Decimal(2e6) },
            costGrowth() { return new Decimal(7) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return hasMilestone("spaceZone1", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Loot Increaser"
            },
            display() {
                return "which are boosting space rock and space gem gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
        },
        17: {
            costBase() { return new Decimal(5e6) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.pl.spaceDust},
            pay(amt) { player.pl.spaceDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.001) },
            unlocked() { return hasMilestone("spaceZone1", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Level Descaler"
            },
            display() {
                return "which are reducing space battle level softcap scaling by -" + formatSimple(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Dust"
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
            style: { width: '250px', height: '150px', color: "black", background: "#279ccf" },
            progressColor: "#279ccf7f",
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
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You will sacrifice <h3>" + formatWhole(player.pl.starInputAmount) + "</h3> stars to find planets." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", () => { return "Planet find chance: " + formatWhole(player.pl.planetChance.mul(100)) + "%. (Decreases with planets)" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return player.pl.planets.gt(4471) ? "<small style='margin-left:10px'>[SOFTCAPPED]</small>" : "" }, {color: "red", fontSize: "24px", fontFamily: "monospace"}],
                    ]],
                    ["blank", "25px"],
                    ["style-row", [
                        ["text-input", "starInput", {width: "300px", height: "50px", color: "white", textAlign: "left", fontSize: "32px", background: "rgba(0,0,0,0.5)", border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px", padding: "0 25px 0 25px"}],
                        ["clickable", 11],
                    ], {width: "652px", border: "2px solid white", borderRadius: "17px"}],
                ]
            },
            "Space Dust": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.pl.spaceDust) + "/" + format(player.pl.spaceDustCapacity) + "</h3> space dust." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.pl.spaceDustPerSecond) + "</h3> space dust per second. (based on planets)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                        ["rounded-ex-buyable", 11], 
                    ]],
                    ["blank", "25px"],
                    ["row", [
                        ["rounded-ex-buyable", 12],
                        ["style-row", [], {width: "3px"}],
                        ["rounded-ex-buyable", 13],
                        ["style-row", [], {width: "3px"}],
                        ["rounded-ex-buyable", 14], 
                    ]],
                    ["style-row", [], {height: "3px"}],
                    ["row", [
                        ["rounded-ex-buyable", 15],
                        ["style-row", [], {width: "3px"}],
                        ["rounded-ex-buyable", 16],
                        ["style-row", [], {width: "3px"}],
                        ["rounded-ex-buyable", 17], 
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.pl.planets) + "</h3> planets." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.st.buyables[202].gte(1) },
    hotkeys: [
        {
            key: "p", 
            description: "Find Planets",
            onPress() {
                clickClickable(this.layer, 11)
            },
        }
	]
})
