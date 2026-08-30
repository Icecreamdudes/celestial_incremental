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
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("pet", 5))
            if (hasUpgrade("ev8", 21)) player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(1.4)
            if (hasUpgrade("ep2", 11)) player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(upgradeEffect("ep2", 11))
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("sp", 13))
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("sme", 113))
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("ep1", 17))
            player.ep0.timers[thing].base = player.ep0.timers[thing].base.mul(buyableEffect("ep1", 105))
        }

        player.ep0.timers[0].max = new Decimal(60)
        player.ep0.timers[1].max = new Decimal(240)
        player.ep0.timers[2].max = new Decimal(600)
        for (let thing in player.ep0.timers) {
            player.ep0.timers[thing].max = player.ep0.timers[thing].max.div(buyableEffect("pet", 6))

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
            style() {
                let look = {width: "196px", minHeight: "46px", marginTop: "2px", marginBottom: "2px", fontSize: "9px", borderRadius: "10px", border: "2px solid #0000007f"}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
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
            style() {
                let look = {width: "196px", minHeight: "46px", marginTop: "2px", marginBottom: "2px", fontSize: "9px", borderRadius: "10px", border: "2px solid #0000007f"}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
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
            style() {
                let look = {width: "196px", minHeight: "46px", marginTop: "2px", marginBottom: "2px", fontSize: "9px", borderRadius: "10px", border: "2px solid #0000007f"}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
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
                let look = {width: "140px", minHeight: "40px", borderRadius: "10px", margin: "5px", border: "2px solid #0000007f"}
                this.canClick() ? look.backgroundColor = "#cceaf9" : look.backgroundColor = "#bf8f8f"
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
            description() { return "Boosts gold based on dotknight points." },
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