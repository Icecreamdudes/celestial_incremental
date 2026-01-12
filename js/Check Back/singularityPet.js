addLayer("sp", {
    name: "Singularity Pets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sp", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        kresPoints: new Decimal(0),
        kresPointsMax: new Decimal(100),
        kresPointsPerSecond: new Decimal(0),

        navPoints: new Decimal(0),
        navPointsMax: new Decimal(100),
        navPointsPerSecond: new Decimal(0),

        selPoints: new Decimal(0),
        selPointsMax: new Decimal(100),
        selPointsPerSecond: new Decimal(0),
    }},
    nodeStyle: {
        background: "linear-gradient(90deg, #910a27, #710a91, #065c19)",
        backgroundOrigin: "border-box",
        borderColor: "rgba(0,0,0,0.5)",
        color: "rgba(255,255,255,0.8)",
    },
    tooltip: "Singularity Pets",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        // KRES
        player.sp.kresPointsMax = new Decimal(100)
        player.sp.kresPointsMax = player.sp.kresPointsMax.add(buyableEffect("sp", 11))

        let kresAmt = getLevelableAmount("pet", 404).add(getLevelableTier("pet", 404).mul(5).min(40))
        player.sp.kresPointsPerSecond = kresAmt.pow(1.1).div(10).mul(getLevelableTier("pet", 404).add(1))
        player.sp.kresPoints = player.sp.kresPoints.add(player.sp.kresPointsPerSecond.mul(delta))

        if (player.sp.kresPoints.gte(player.sp.kresPointsMax)) {
            player.sp.kresPoints = player.sp.kresPointsMax
        }

        // NAV
        player.sp.navPointsMax = new Decimal(100)
        player.sp.navPointsMax = player.sp.navPointsMax.add(buyableEffect("sp", 21))

        let navAmt = getLevelableAmount("pet", 405).add(getLevelableTier("pet", 405).mul(5).min(40))
        player.sp.navPointsPerSecond = navAmt.pow(1.1).div(10).mul(getLevelableTier("pet", 405).add(1))
        player.sp.navPoints = player.sp.navPoints.add(player.sp.navPointsPerSecond.mul(delta))

        if (player.sp.navPoints.gte(player.sp.navPointsMax)) {
            player.sp.navPoints = player.sp.navPointsMax
        }

        // SEL
        player.sp.selPointsMax = new Decimal(100)
        player.sp.selPointsMax = player.sp.selPointsMax.add(buyableEffect("sp", 31))

        let selAmt = getLevelableAmount("pet", 406).add(getLevelableTier("pet", 406).mul(5).min(40))
        player.sp.selPointsPerSecond = selAmt.pow(1.1).div(10).mul(getLevelableTier("pet", 406).add(1))
        player.sp.selPoints = player.sp.selPoints.add(player.sp.selPointsPerSecond.mul(delta))

        if (player.sp.selPoints.gte(player.sp.selPointsMax)) {
            player.sp.selPoints = player.sp.selPointsMax
        }
    },
    buyables: {
        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.sp.kresPoints},
            pay() { player.sp.kresPoints = player.sp.kresPoints.sub(player.sp.kresPointsMax.div(buyableEffect("pet", 8))) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.sp.kresPointsMax.div(buyableEffect("pet", 8)) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/999)"
            },
            display() {
                return 'which are boosting kres point capacity by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatSimple(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "250px", height: "100px", fontSize: "12px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#910a27"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sp.kresPoints},
            pay(amt) { player.sp.kresPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Defense"
            },
            display() {
                return 'which are boosting black heart defense by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: "250px", height: "150px", color: "white", backgroundColor: "#910a27"},
        },
        13: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.kresPoints},
            pay(amt) { player.sp.kresPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Synergy"
            },
            display() {
                return 'which are boosting dotknight points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#910a27"},
        },
        14: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.kresPoints},
            pay(amt) { player.sp.kresPoints = this.currency().sub(amt) },
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#910a27"},
        },
        15: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.kresPoints},
            pay(amt) { player.sp.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Fragmentation"
            },
            display() {
                return 'which are dividing fragmentation cooldowns by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#910a27"},
        },
        
        21: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.sp.navPoints},
            pay() { player.sp.navPoints = player.sp.navPoints.sub(player.sp.navPointsMax.div(buyableEffect("pet", 8))) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.sp.navPointsMax.div(buyableEffect("pet", 8)) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/999)"
            },
            display() {
                return 'which are boosting nav point capacity by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatSimple(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "250px", height: "100px", fontSize: "12px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#710a91"
                return look
            },
        },
        22: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sp.navPoints},
            pay(amt) { player.sp.navPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Strength"
            },
            display() {
                return 'which are boosting black heart strength by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: "250px", height: "150px", color: "white", backgroundColor: "#710a91"},
        },
        23: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.navPoints},
            pay(amt) { player.sp.navPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Synergy"
            },
            display() {
                return 'which are boosting dragon points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#710a91"},
        },
        24: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.navPoints},
            pay(amt) { player.sp.navPoints = this.currency().sub(amt) },
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#710a91"},
        },
        25: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.navPoints},
            pay(amt) { player.sp.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Fragments"
            },
            display() {
                return 'which are multiplying fragmentation fragment gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#710a91"},
        },

        31: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.sp.selPoints},
            pay() { player.sp.selPoints = player.sp.selPoints.sub(player.sp.selPointsMax.div(buyableEffect("pet", 8))) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.sp.selPointsMax.div(buyableEffect("pet", 8)) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Capacity Increaser (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/999)"
            },
            display() {
                return 'which are boosting sel point capacity by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatSimple(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "250px", height: "100px", fontSize: "12px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#065c19"
                return look
            },
        },
        32: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sp.selPoints},
            pay(amt) { player.sp.selPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel Agility"
            },
            display() {
                return 'which are boosting black heart agility by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: "250px", height: "150px", color: "white", backgroundColor: "#065c19"},
        },
        33: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.selPoints},
            pay(amt) { player.sp.selPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel Synergy"
            },
            display() {
                return 'which are boosting cookies by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#065c19"},
        },
        34: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.selPoints},
            pay(amt) { player.sp.selPoints = this.currency().sub(amt) },
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#065c19"},
        },
        35: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sp.selPoints},
            pay(amt) { player.sp.selPoints = this.currency().sub(amt) },
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
            style: {width: '250px', height: '150px', color: "white", backgroundColor: "#065c19"},
        },
    },
    microtabs: {
        stuff: {
            "Kres": {
                title() {return "Kres<br><small>(" + formatSimple(player.sp.kresPoints, 2) + "/" + formatWhole(player.sp.kresPointsMax) + ")</small>"},
                buttonStyle() { return {color: "white", background: "#910a27", borderColor: "rgba(0,0,0,0.5)", borderRadius: "5px"}},
                unlocked() { return getLevelableAmount("pet", 404).gte(1) || getLevelableTier("pet", 404).gte(1)},
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatSimple(player.sp.kresPoints, 2) + "/" + formatWhole(player.sp.kresPointsMax) + "</h3> kres points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You are gaining <h3>" + format(player.sp.kresPointsPerSecond) + "</h3> kres points per second. (based on level/ascension)"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "20px"],
                        ["buyable", 11],
                        ["blank", "20px"],
                        ["row", [["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14], ["ex-buyable", 15]], {maxWidth: "600px"}],
                    ], {width: "700px", height: "550px", background: "#2b030b", border: "3px solid white", borderRadius: "20px"}],
                ],
            },
            "Nav": {
                title() {return "Nav<br><small>(" + formatSimple(player.sp.navPoints, 2) + "/" + formatWhole(player.sp.navPointsMax) + ")</small>"},
                buttonStyle() { return {color: "white", background: "#710a91", borderColor: "rgba(0,0,0,0.5)", borderRadius: "5px"}},
                unlocked() { return getLevelableAmount("pet", 405).gte(1) || getLevelableTier("pet", 405).gte(1)},
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatSimple(player.sp.navPoints, 2) + "/" + formatWhole(player.sp.navPointsMax) + "</h3> nav points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You are gaining <h3>" + format(player.sp.navPointsPerSecond) + "</h3> nav points per second. (based on level/ascension)"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "20px"],
                        ["buyable", 21],
                        ["blank", "20px"],
                        ["row", [["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24], ["ex-buyable", 25]], {maxWidth: "600px"}],
                    ], {width: "700px", height: "550px", background: "#21032b", border: "3px solid white", borderRadius: "20px"}],
                ],
            },
            "Sel": {
                title() {return "Sel<br><small>(" + formatSimple(player.sp.selPoints, 2) + "/" + formatWhole(player.sp.selPointsMax) + ")</small>"},
                buttonStyle() { return {color: "white", background: "#065c19", borderColor: "rgba(0,0,0,0.5)", borderRadius: "5px"}},
                unlocked() { return getLevelableAmount("pet", 406).gte(1) || getLevelableTier("pet", 406).gte(1)},
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatSimple(player.sp.selPoints, 2) + "/" + formatWhole(player.sp.selPointsMax) + "</h3> sel points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You are gaining <h3>" + format(player.sp.selPointsPerSecond) + "</h3> sel points per second. (based on level/ascension)"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "20px"],
                        ["buyable", 31],
                        ["blank", "20px"],
                        ["row", [["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34], ["ex-buyable", 35]], {maxWidth: "600px"}],
                    ], {width: "700px", height: "550px", background: "#011b07", border: "3px solid white", borderRadius: "20px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 404).gte(1) || getLevelableTier("pet", 404).gte(1)) || (getLevelableAmount("pet", 405).gte(1) || getLevelableTier("pet", 405).gte(1)) || (getLevelableAmount("pet", 406).gte(1) || getLevelableTier("pet", 406).gte(1)) }
})