addLayer("re", {
    name: "Realm Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        halterEssence: new Decimal(0),

        realmEssence: new Decimal(0),
        realmEssenceToGet: new Decimal(0),
        realmEssenceEffect: new Decimal(1),
        realmEssencePerSecond: new Decimal(0),
    }
    },
    automate() {

    },
    nodeStyle() {
        return {
            "background-image": "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)",
            "background-origin": "border-box",
            "color": "black",
            "border-color": "white",
        }
    },
    tooltip: "Realm Essence",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
        player.re.realmEssence = player.re.realmEssence.add(player.re.realmEssencePerSecond.mul(delta))

        player.re.realmEssencePerSecond = player.re.halterEssence.pow(1.4)
        player.re.realmEssencePerSecond = player.re.realmEssencePerSecond.mul(buyableEffect("re", 14))

        player.re.realmEssenceEffect = player.re.realmEssence.plus(1).log10().mul(1000).pow(0.2).div(235).add(1)
        //WORK ON THE DANG EFFECT
    },
    branches: ["h", "r", "f", "p"],
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
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(50)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.re.realmEssence.gte(this.cost()) },
            title() {
                return "Check Back XP Realm Booster"
            },
            display() {
                return "which are boosting check back xp gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Realm Essence."
            },
            buy(mult) {
                let base = new Decimal(50)
                let growth = 1.25
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.re.realmEssence = player.re.realmEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.re.realmEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.re.realmEssence = player.re.realmEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)", backgroundOrigin: "border-box"}
        },
        12: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(100)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.005).add(1) },
            unlocked() { return true },
            canAfford() { return player.re.realmEssence.gte(this.cost()) },
            title() {
                return "XP Boost Realm Booster"
            },
            display() {
                return "which are boosting XPBoost gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Realm Essence."
            },
            buy(mult) {
                let base = new Decimal(100)
                let growth = 1.3
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.re.realmEssence = player.re.realmEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.re.realmEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.re.realmEssence = player.re.realmEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)", backgroundOrigin: "border-box"}
        },
        13: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(250)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.re.realmEssence.gte(this.cost()) },
            title() {
                return "XP Button Cooldown Realm Booster"
            },
            display() {
                return "which are dividing XP button cooldowns by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Realm Essence."
            },
            buy(mult) {
                let base = new Decimal(250)
                let growth = 1.4
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.re.realmEssence = player.re.realmEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.re.realmEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.re.realmEssence = player.re.realmEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)", backgroundOrigin: "border-box"}
        },
        14: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.re.realmEssence.gte(this.cost()) },
            title() {
                return "Realm Essence Booster"
            },
            display() {
                return "which are boosting realm essence by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Realm Essence."
            },
            buy(mult) {
                let base = new Decimal(1000)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.re.realmEssence = player.re.realmEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
                let max = Decimal.affordGeometricSeries(player.re.realmEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.re.realmEssence = player.re.realmEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)", backgroundOrigin: "border-box"}
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.re.realmEssence) + "</h3> Realm Essence, which boosts all pre-otf currencies by ^" + format(player.re.realmEssenceEffect, 3) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.re.realmEssencePerSecond) + "</h3> Realm Essence per second (based on halter essence)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.re.halterEssence) + "</h3> Halter Essence" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + format(player.rm.halterBoostEffect) + "</h3> Halter Essence on singularity reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Based on realm mod halter amount)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],

        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 20)}
})
/*        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),*/
