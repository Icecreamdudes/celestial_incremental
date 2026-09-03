addLayer("ep3", {
    name: "Goobert", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Gb", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
    }},
    nodeStyle: {
        background: "linear-gradient(-45deg, #804080, #608060)",
		backgroundOrigin: "border-box",
		borderColor: "#403040",
		color: "#ffe0ff"
    },
    tooltip: "Goobert",
    color: "#ffe0ff",
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    buyables: {
        11: {
            costBase() { return new Decimal(0.1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.ev0.coinDust},
            pay(amt) {player.ev0.coinDust = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Coin Dust Booster"
            },
            display() {
                return "which are boosting coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
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
                        ["style-row", [
                            ["style-row", [
                                
                            ], {background: "#232e23", border: "3px solid #485e48", borderRadius: "10px", width: "450px", height: "600px"}],
                        ], {border: "3px solid #efffef", borderRadius: "13px"}],
                        ["blank", "25px"],
                    ]
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["blank", "25px"],
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 407).gte(1) || getLevelableTier("pet", 407).gte(1))}
})