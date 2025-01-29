addLayer("rg", {
    name: "Repli-Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        inRepliGrassTab: false,
        repliGrass: new Decimal(1),
        savedRepliGrass: new Decimal(0),
        repliGrassEffect: new Decimal(1),
        repliGrassEffect2: new Decimal(1),
        repliGrassCap: new Decimal(50),
        repliGrassCount: new Decimal(0),
        repliGrassMult: new Decimal(1.01),
        repliGrassReq: new Decimal(8),
        repliGrassTimer: new Decimal(0),

        repliGrassSoftcapEffect: new Decimal(1),
        repliGrassSoftcapStart: new Decimal(1000),
    }
    },
    automate() {
        if (hasMilestone("s", 16) && !inChallenge("fu", 11))
        {
            buyBuyable('rg', 11)
            buyBuyable('rg', 12)
            buyBuyable('rg', 13)
            buyBuyable('rg', 14)
            buyBuyable('rg', 15)
            buyBuyable('rg', 16)
            buyBuyable('rg', 17)
            buyBuyable('rg', 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Repli-Grass",
    branches: ["rt"],
    color: "#67cc3b",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.subtabs["rg"]['stuff'] == 'Main' && player.tab == "rg" && player.rg.inRepliGrassTab == false)
        {
           layers.rg.loadRepliGrass();
        }
        if (!(player.subtabs["rg"]['stuff'] == 'Main') && !(player.tab == "rg") && player.rg.inRepliGrassTab == true)
        {
           layers.rg.unloadRepliGrass();
        }
        if (player.subtabs["rg"]['stuff'] == 'Main' && player.tab == "rg")
        {
            player.rg.inRepliGrassTab = true
            if (player.rg.repliGrassCount < player.rg.repliGrassCap) player.rg.repliGrassTimer = player.rg.repliGrassTimer.add(onepersec.mul(delta))
            if (player.rg.repliGrassTimer.gt(player.rg.repliGrassReq))
            {
                if (player.rg.repliGrassCount < player.rg.repliGrassCap)
                {
                    createRepliGrass(1);
                    player.rg.savedRepliGrass++;
                }
                player.rg.repliGrassTimer = new Decimal(0)
                if (!inChallenge("fu", 11)) player.rg.repliGrass = player.rg.repliGrass.mul(Decimal.add(player.rg.repliGrassMult.sub(1).mul(buyableEffect("fa", 203)), 1))
            }
        } else if (!(player.tab == "rg"))
        {
            player.rg.inRepliGrassTab = false
            if (player.rg.repliGrassCount < player.rg.repliGrassCap) player.rg.repliGrassTimer = player.rg.repliGrassTimer.add(onepersec.mul(delta))
            if (player.rg.repliGrassTimer.gt(player.rg.repliGrassReq) && player.rg.savedRepliGrass < player.rg.repliGrassCap)
            {
                player.rg.savedRepliGrass++;
                player.rg.repliGrassTimer = new Decimal(0)
            } else if (player.rg.savedRepliGrass > player.rg.repliGrassCap) {
                player.rg.savedRepliGrass = player.rg.repliGrassCap
            }
        } else
        {
            player.rg.inRepliGrassTab = false
            if (player.rg.repliGrassCount < player.rg.repliGrassCap) player.rg.repliGrassTimer = player.rg.repliGrassTimer.add(onepersec.mul(delta))
        }
        if (player.rg.repliGrassCount < 0)
        {
            player.rg.repliGrassCount = new Decimal(0)
        }

        player.rg.repliGrassCap = new Decimal(50)
        player.rg.repliGrassCap = player.rg.repliGrassCap.add(buyableEffect("rg", 13))

        player.rg.repliGrassSoftcapStart = new Decimal(1000)
        player.rg.repliGrassSoftcapStart = player.rg.repliGrassSoftcapStart.mul(buyableEffect("rg", 14))
        player.rg.repliGrassSoftcapStart = player.rg.repliGrassSoftcapStart.mul(buyableEffect("fu", 56))

        let multAdd = new Decimal(0.02)
        multAdd = multAdd.add(buyableEffect("rg", 11))
        multAdd = multAdd.mul(buyableEffect("gs", 18))
        multAdd = multAdd.mul(player.oi.linkingPowerEffect[4])
        multAdd = multAdd.add(buyableEffect("fu", 23))
        if (inChallenge("fu", 11)) multAdd = multAdd.pow(0.2)

        player.rg.repliGrassSoftcapEffect = player.rg.repliGrass.sub(player.rg.repliGrassSoftcapStart).pow(0.225)
        if (player.rg.repliGrass.gte(player.rg.repliGrassSoftcapStart))
        {
            multAdd = multAdd.div(player.rg.repliGrassSoftcapEffect)
        }

        player.rg.repliGrassMult = multAdd.add(1)

        if (player.rg.repliGrass.lte(1)) player.rg.repliGrassEffect = new Decimal(1)
        if (player.rg.repliGrass.gt(1)) player.rg.repliGrassEffect = player.rg.repliGrass.pow(0.15)

        if (player.rg.repliGrass.lte(1)) player.rg.repliGrassEffect2 = new Decimal(1)
        if (player.rg.repliGrass.gt(1)) player.rg.repliGrassEffect2 = player.rg.repliGrass.pow(0.25)

        player.rg.repliGrassReq = new Decimal(8)
        player.rg.repliGrassReq = player.rg.repliGrassReq.div(buyableEffect("rg", 12))
    },
    unloadRepliGrass()
    {
        player.rg.grassTimer = new Decimal(0)
        player.rg.grassCount = new Decimal(0)
    },
    loadRepliGrass()
    {
        removeAllRepliGrass();
        createRepliGrass(player.rg.savedRepliGrass);
        player.rg.repliGrassCount = player.rg.savedRepliGrass
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.5)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.0025) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Grass Mult."
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the repli-grass multiplier.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(1.5)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(5).pow(x || getBuyableAmount(this.layer, this.id)).mul(2)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Grass Grow Rate."
            },
            display() {
                return "which are dividing the repli-grass grow time by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(2)
                let growth = 5
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(4)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Grass Capacity."
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the repli-grass capacity.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(4)
                let growth = 2
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(8)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Grass Softcap."
            },
            display() {
                return "which are extending the repli-grass softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(3)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.8).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Point Multiplier."
            },
            display() {
                return "which are multiplying the replicanti point multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.45
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.55).pow(x || getBuyableAmount(this.layer, this.id)).mul(7)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tetr Point Multiplier."
            },
            display() {
                return "which are multiplying tetr points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(7)
                let growth = 1.55
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(16)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.8).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Anonymity Multiplier."
            },
            display() {
                return "which are multiplying anonymity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(16)
                let growth = 1.5
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(30)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.rg.repliGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Softcap Extender."
            },
            display() {
                return "which are extending the first, second, and repli-tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass."
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.35
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rg.repliGrass = player.rg.repliGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.rg.repliGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.rg.repliGrass = player.rg.repliGrass.sub(cost)

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
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "<h3>" + formatWhole(player.rg.repliGrassCount) + "/" + formatWhole(player.rg.repliGrassCap) + " Repli-Grass (Hover over the grass)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>" + format(player.rg.repliGrassTimer) + "/" + format(player.rg.repliGrassReq) + " Seconds to spawn repli-grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Repli-Grass mult: x" + format(player.rg.repliGrassMult) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Repli-Grass boosts repli-leaf mult by x" + format(player.rg.repliGrassEffect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Repli-Grass boosts replicanti point mult by x" + format(player.rg.repliGrassEffect2) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.rg.repliGrass.gte(player.rg.repliGrassSoftcapStart) ? "After " + formatWhole(player.rg.repliGrassSoftcapStart) + " repli-grass, repli-grass mult is divided by " + format(player.rg.repliGrassSoftcapEffect) + "." : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return options.newMenu ? "<div id=repli-spawn-area class=menu-spawn-area></div>" : "<div id=repli-spawn-area class=spawn-area></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.rg.repliGrass) + "</h3> repli-grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 16) }
})

function createRepliGrass(quantity) {
    const spawnArea = document.getElementById('repli-spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) return; // Exit if spawnAreaRect is null or undefined

    // Function to calculate the distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Create repli circles based on quantity
    for (let i = 0; i < quantity; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (spawnAreaRect.width - 22.5)); // Adjusted for circle width
            randomY = Math.floor(Math.random() * (spawnAreaRect.height - 22.5)); // Adjusted for circle height
        } while (isCollision(randomX, randomY));

        const repliCircle = document.createElement('div');
        repliCircle.style.borderRadius = '100%';
        repliCircle.style.width = '22.5px';
        repliCircle.style.height = '22.5px';
        repliCircle.style.backgroundColor = '#18e34e';
        repliCircle.style.position = 'absolute';
        repliCircle.style.left = `${randomX}px`;
        repliCircle.style.top = `${randomY}px`;
        repliCircle.style.border = '2px solid black'; // Add a black border
        repliCircle.classList.add('repli-circle');

        spawnArea.appendChild(repliCircle); // Append to spawnArea instead of document.body

        // Function to check if cursor is within 100px radius of the repliCircle
        function checkCursorDistance(event) {
            const cursorX = event.clientX;
            const cursorY = event.clientY;

            const repliCircleRect = repliCircle.getBoundingClientRect();
            const circleCenterX = repliCircleRect.left + repliCircleRect.width / 2;
            const circleCenterY = repliCircleRect.top + repliCircleRect.height / 2;

            const distance = getDistance(cursorX, cursorY, circleCenterX, circleCenterY);

            // If the cursor is within 100 pixels, remove the repliCircle
            if (distance <= 100) {
                removeRepliGrass(repliCircle);
                player.rg.repliGrassCount--; // Decrease grass count
                player.rg.savedRepliGrass--; // Decrease saved repli grass count
                player.rg.repliGrass = player.rg.repliGrass.mul(player.rg.repliGrassMult);

                // Remove the mousemove listener once the repliCircle is collected
                document.removeEventListener('mousemove', checkCursorDistance);
            }
        }

        // Add the mousemove event listener to check the distance from the cursor
        document.addEventListener('mousemove', checkCursorDistance);

        player.rg.repliGrassCount++; // Increase repli grass count

        // Start moving the repliCircle
        moveRepliCircle(repliCircle, spawnAreaRect);
    }
}


function isCollision(x, y) {
    const existingRepliCircles = document.querySelectorAll('.repli-circle');
    for (let i = 0; i < existingRepliCircles.length; i++) {
        const squareRect = existingRepliCircles[i].getBoundingClientRect();
        if (x >= squareRect.left && x <= squareRect.right && y >= squareRect.top && y <= squareRect.bottom) {
            return true; // Collision detected
        }
    }
    return false; // No collision detected
}

function moveRepliCircle(circle, spawnAreaRect) {
    const moveInterval = 16; // Interval in milliseconds (approx. 60 FPS)
    const moveSpeed = 5; // Movement speed in pixels per frame
    const gridSize = 250; // Size of each grid cell

    function getRandomPositionInGrid() {
        const x = Math.random() * (spawnAreaRect.width - 22.5); // Random x in the entire area
        const y = Math.random() * (spawnAreaRect.height - 22.5); // Random y in the entire area
        return { x, y };
    }

    let { x: targetX, y: targetY } = getRandomPositionInGrid();

    function move() {
        let currentX = parseFloat(circle.style.left);
        let currentY = parseFloat(circle.style.top);

        let dx = targetX - currentX;
        let dy = targetY - currentY;

        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > moveSpeed) {
            dx = (dx / distance) * moveSpeed;
            dy = (dy / distance) * moveSpeed;
        }

        currentX += dx;
        currentY += dy;

        // Ensure the circle stays within bounds
        circle.style.left = `${Math.max(0, Math.min(spawnAreaRect.width - 22.5, currentX))}px`;
        circle.style.top = `${Math.max(0, Math.min(spawnAreaRect.height - 22.5, currentY))}px`;

        // Set a new target position after reaching the current target
        if (Math.abs(targetX - currentX) < moveSpeed && Math.abs(targetY - currentY) < moveSpeed) {
            ({ x: targetX, y: targetY } = getRandomPositionInGrid());
        }

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
}


function removeRepliGrass(circle) {
    circle.parentNode.removeChild(circle);
}

function removeAllRepliGrass() {
    const circles = document.querySelectorAll('.repli-circle');
    circles.forEach(circle => circle.parentNode.removeChild(circle));
}

window.addEventListener('load', function() {
    // This function will be executed after the page is reloaded
    // You can perform any necessary tasks here
    layers.rg.loadRepliGrass();
});
