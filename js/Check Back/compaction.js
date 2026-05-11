addLayer("ev15", {
    name: "Compaction", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cm", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
    }},
    nodeStyle: {
        background: "linear-gradient(45deg, #308fbf 0%, #9bbf30 50%, #30bf54 100%)",
		backgroundOrigin: "border-box",
		borderColor: "#10401c",
		color: "#10401c"
    },
    tooltip: "Compaction",
    color: "#30bf54",
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1e4) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cb.evolutionShards},
            pay(amt) {player.cb.evolutionShards = this.currency().sub(amt)},
            effect(x) { return new Decimal(1).div(getBuyableAmount(this.layer, this.id).pow(0.5).div(20).add(1))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Level Stacking"
            },
            display() {
                return "which are reducing the check back level requirement by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
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
            style: { width: '275px', height: '150px', background: "#39ace6"},
            progressColor: "#39ace67f",
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cb.paragonShards},
            pay(amt) {player.cb.paragonShards = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(1.25).sub(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Packing"
            },
            display() {//player.ev15.buyables[12] = new Decimal(25)
                return "which are boosting crate roll chance and pet points from rare buttons by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
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
            style: { width: '275px', height: '150px', background: "#bbe639"},
            progressColor: "#bbe6397f",
        },
        13: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cbs.ascensionShards},
            pay(amt) {player.cbs.ascensionShards = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.2).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "XPBoost is Slacking"
            },
            display() {
                return "which are boosting the XP boost effect by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Ascension Shards"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
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
            style: { width: '275px', height: '150px', background: "#39e664"},
            progressColor: "#39e6647f",
        },
    },
    microtabs: {
        stuff: {
            "Projects": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    // #663366
                    // #994d86
                    // #ffa8d3
                    // #dfffdf
                    let look = [
                        ["style-column", [
                            ["style-row", [
                                ["rounded-ex-buyable", 11], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 12], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 13],
                            ]],
                        ], {background: "linear-gradient(90deg, #308fbf 0%, #9bbf30 50%, #30bf54 100%)", border: "3px solid #10401c", padding: "6px", borderRadius: "13px"}],
                        ["blank", "25px"],
                    ]
                    look[0][1].push(["blank", "3px", {width: "3px"}])
                    if (false) {
                        look[0][1].push(
                            ["style-row", [
                                ["rounded-ex-buyable", 21], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 22], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 23],
                            ]],
                        )
                    } else {
                        look[0][1].push(
                            ["style-row", [
                                ["raw-html", "<h2>x" + format(player.cb.baseESC) + " / 1,000 </h2><h3>base ESC</h3>", {width: "68px", height: "50px", color: "#39ace6"}],
                            ], {background: "black", border: "3px solid #39ace6", borderRadius: "15px", width: "843px", height: "150px"}],
                        )
                    }
                    look[0][1].push(["blank", "3px", {width: "3px"}])
                    if (false) {
                        look[0][1].push(
                            ["style-row", [
                                ["rounded-ex-buyable", 31], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 32], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 33],
                            ]],
                        )
                    } else {
                        look[0][1].push(
                            ["style-row", [
                                ["raw-html", "<h3>Grassman level</h3><h2> " + formatWhole(new Decimal(1)) + " / 5</h2>", {width: "68px", height: "50px", color: "#bbe639"}],
                            ], {background: "black", border: "3px solid #bbe639", borderRadius: "15px", width: "843px", height: "150px"}],
                        )
                    }
                    look[0][1].push(["blank", "3px", {width: "3px"}])
                    if (false) {
                        look[0][1].push(
                            ["style-row", [
                                ["rounded-ex-buyable", 41], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 42], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 43],
                            ]],
                        )
                    } else {
                        look[0][1].push(
                            ["style-row", [
                                ["raw-html", "<h2>x" + format(player.cb.basePSC) + " / 10 </h2><h3>base PSC</h3>", {width: "68px", height: "50px", color: "#39e664"}],
                            ], {background: "black", border: "3px solid #39e664", borderRadius: "15px", width: "843px", height: "150px"}],
                        )
                    }
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["blank", "25px"],
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame && true }
})