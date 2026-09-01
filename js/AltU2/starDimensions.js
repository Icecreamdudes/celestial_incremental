addLayer("sdim", {
    name: "Star Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SD", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starPower: new Decimal(0),
        starPowerEffect: new Decimal(1), //Points
        starPowerEffect2: new Decimal(1), //Dice Points and Rocket Fuel
        starPowerEffect3: new Decimal(1), //Singularity Dimensions
        starPowerPerSecond: new Decimal(0),

        // Dimension Amounts
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsTimerMax: [new Decimal(5),new Decimal(8),new Decimal(12),new Decimal(18),new Decimal(25),new Decimal(36),new Decimal(50),new Decimal(75),],
        dimensionsGain: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],

        dimensionPower: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionPowerEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        dimensionPowerPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        //dimension power boosts lower tier dimension gain, and dimensions produce its respective dimension power

        //buymax
        dimMax: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #37078f 0%, #9badff 200%)",
            backgroundOrigin: "border-box",
            borderColor: "#0000007f",
            color: "#ffffff",
        };
    },
    tooltip: "Star Dimensions",
    branches: ["st"],
    color: "#37078f",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    bars: {
        0: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(1) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[0].div(player.sdim.dimensionsTimerMax[0])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[0]) + "/" + formatTime(player.sdim.dimensionsTimerMax[0]) + "<h5> to produce 1st dimensions</h5>";
            },
        },
        1: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(2) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[1].div(player.sdim.dimensionsTimerMax[1])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[1]) + "/" + formatTime(player.sdim.dimensionsTimerMax[1]) + "<h5> to produce 2nd dimensions</h5>";
            },
        },
        2: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(3) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[2].div(player.sdim.dimensionsTimerMax[2])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[2]) + "/" + formatTime(player.sdim.dimensionsTimerMax[2]) + "<h5> to produce 3rd dimensions</h5>";
            },
        },
        3: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(4) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[3].div(player.sdim.dimensionsTimerMax[3])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[3]) + "/" + formatTime(player.sdim.dimensionsTimerMax[3]) + "<h5> to produce 4th dimensions</h5>";
            },
        },
        4: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(5) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[4].div(player.sdim.dimensionsTimerMax[4])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[4]) + "/" + formatTime(player.sdim.dimensionsTimerMax[4]) + "<h5> to produce 5th dimensions</h5>";
            },
        },
        5: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(6) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[5].div(player.sdim.dimensionsTimerMax[5])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[5]) + "/" + formatTime(player.sdim.dimensionsTimerMax[5]) + "<h5> to produce 6th dimensions</h5>";
            },
        },
        6: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(7) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[6].div(player.sdim.dimensionsTimerMax[6])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[6]) + "/" + formatTime(player.sdim.dimensionsTimerMax[6]) + "<h5> to produce 7th dimensions</h5>";
            },
        },
        7: {
            unlocked() { return getBuyableAmount("sdim", 1).gte(8) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.sdim.dimensionsTimer[7].div(player.sdim.dimensionsTimerMax[7])
            },
            borderStyle: {border: "0", borderRight: "2px solid white", borderRadius: "15px 0 0 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#5d1482"},
            display() {
                return "<h5>" + formatTime(player.sdim.dimensionsTimer[7]) + "/" + formatTime(player.sdim.dimensionsTimerMax[7]) + "<h5> to produce 8th dimensions</h5>";
            },
        },
    },
    clickables: {
        3: {
            title() { return "Buy Max On" },
            canClick() { return player.sdim.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.sdim.dimMax = true
            },
            style() {
                let look = {width: "80px", minHeight: "50px", borderRadius: "15px 0px 0px 15px"}
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        4: {
            title() { return "Buy Max Off" },
            canClick() { return player.sdim.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.sdim.dimMax = false
            },
            style() {
                let look = {width: "80px", minHeight: "50px", borderRadius: "0"}
                if (getBuyableAmount("sdim", 1).gte(8)) look.borderRadius = "0 15px 15px 0"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    levelables: {},
    upgrades: {},
    buyables: {
        1: {
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.au2.stars },
            unlocked() { return getBuyableAmount(this.layer, this.id).lt(8) },
            cost(x) {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal("10")
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return new Decimal("100")
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return new Decimal("10000")
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    return new Decimal("1e7")
                } else if (getBuyableAmount(this.layer, this.id).eq(4)) {
                    return new Decimal("1e11")
                } else if (getBuyableAmount(this.layer, this.id).eq(5)) {
                    return new Decimal("1e16")
                } else if (getBuyableAmount(this.layer, this.id).eq(6)) {
                    return new Decimal("1e25")
                } else if (getBuyableAmount(this.layer, this.id).eq(7)) {
                    return new Decimal("1e36")
                } else {
                    return Decimal.pow(10, getBuyableAmount(this.layer, this.id).sub(1).pow(2))
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Next SD: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "250px", height: "50px", borderRadius: "0px 15px 15px 0px"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(3) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[0] = player.sdim.dimensionAmounts[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[0] = player.sdim.dimensionAmounts[0].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(9) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[1] = player.sdim.dimensionAmounts[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[1] = player.sdim.dimensionAmounts[1].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        13: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(27) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[2] = player.sdim.dimensionAmounts[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[2] = player.sdim.dimensionAmounts[2].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        14: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(81) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(4) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[3] = player.sdim.dimensionAmounts[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[3] = player.sdim.dimensionAmounts[3].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        15: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(243) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[4] = player.sdim.dimensionAmounts[4].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[4] = player.sdim.dimensionAmounts[4].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        16: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(729) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(6) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[5] = player.sdim.dimensionAmounts[5].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[5] = player.sdim.dimensionAmounts[5].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        17: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(2187) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(7) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[6] = player.sdim.dimensionAmounts[6].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[6] = player.sdim.dimensionAmounts[6].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        18: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(6561) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)).sub(1) },
            unlocked() { return getBuyableAmount("sdim", 1).gte(8) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + formatShortWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            buy() {
                if (player.sdim.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sdim.dimensionAmounts[7] = player.sdim.dimensionAmounts[7].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sdim.dimensionAmounts[7] = player.sdim.dimensionAmounts[7].add(max)
                }
            },
            style() {
                let look = {width: "175px", height: "50px", borderRadius: "0 15px 15px 0"}
                this.canAfford() ? look.color = "white" : look.color = "black"
                return look
            },
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
                    ["row", [
                        ["raw-html", () => {return "You have " + formatWhole(player.sdim.starPower) + " star power"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.sdim.starPowerPerSecond) + "/s)"}, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.sdim.starPowerPerSecond.gt(0) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                        ["raw-html", () => {return player.sdim.starPowerPerSecond.gt(1e300) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {
                        let str = "Boosts point gain by ^" + format(player.sdim.starPowerEffect, 3)
                        str += player.sdim.starPowerEffect.gte(1.3) ? hasMilestone("spaceZone1", 13) ? " <small style='color:red'>[SOFTCAPPED]</small>" : " <small style='color:red'>[HARDCAPPED]</small>" : ""
                        return str
                        }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dice points and rocket fuel by x" + format(player.sdim.starPowerEffect2)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts singularity dimensions by x" + format(player.sdim.starPowerEffect3)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 3], ["clickable", 4], ["buyable", 1]], () => {
                        let look = {width: "410px", border: "2px solid white", borderRadius: "17px"}
                        if (getBuyableAmount("sdim", 1).gte(8)) look.width = "160px"
                        return look
                    }],
                    ["blank", "25px"],
                    ["row", [
                        ["column", [
                            ["raw-html", () => {return getBuyableAmount("sdim", 1).gte(1) ? "1st dimension power: " + formatShort(player.sdim.dimensionPower[0]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[0]) + "/s, +" + formatShort(player.sdim.dimensionPowerEffects[0]) + " SP/s)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => {return getBuyableAmount("sdim", 1).gte(1) ? "1st dimension (" + formatShort(buyableEffect("sdim", "11")) + "x): " + formatShort(player.sdim.dimensionAmounts[0]) + " (+" + formatShort(player.sdim.dimensionsGain[0]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 0], ["buyable", 11]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(2) ? "2nd dimension power: " + formatShort(player.sdim.dimensionPower[1]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[1]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[1]) + " 1D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(2) ? "2nd dimension (" + formatShort(buyableEffect("sdim", "12")) + "x): " + formatShort(player.sdim.dimensionAmounts[1]) + " (+" + formatShort(player.sdim.dimensionsGain[1]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 1], ["buyable", 12]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(3) ? "3rd dimension power: " + formatShort(player.sdim.dimensionPower[2]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[2]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[2]) + " 2D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(3) ? "3rd dimension (" + formatShort(buyableEffect("sdim", "13")) + "x): " + formatShort(player.sdim.dimensionAmounts[2]) + " (+" + formatShort(player.sdim.dimensionsGain[2]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 2], ["buyable", 13]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(4) ? "4th dimension power: " + formatShort(player.sdim.dimensionPower[3]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[3]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[3]) + " 3D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(4) ? "4th dimension (" + formatShort(buyableEffect("sdim", "14")) + "x): " + formatShort(player.sdim.dimensionAmounts[3]) + " (+" + formatShort(player.sdim.dimensionsGain[3]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 3], ["buyable", 14]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(5) ? "5th dimension power: " + formatShort(player.sdim.dimensionPower[4]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[4]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[4]) + " 4D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(5) ? "5th dimension (" + formatShort(buyableEffect("sdim", "15")) + "x): " + formatShort(player.sdim.dimensionAmounts[4]) + " (+" + formatShort(player.sdim.dimensionsGain[4]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 4], ["buyable", 15]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(6) ? "6th dimension power: " + formatShort(player.sdim.dimensionPower[5]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[5]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[5]) + " 5D" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(6) ? "6th dimension (" + formatShort(buyableEffect("sdim", "16")) + "x): " + formatShort(player.sdim.dimensionAmounts[5]) + " (+" + formatShort(player.sdim.dimensionsGain[5]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 5], ["buyable", 16]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(7) ? "7th dimension power: " + formatShort(player.sdim.dimensionPower[6]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[6]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[6]) + " 6D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(7) ? "7th dimension (" + formatShort(buyableEffect("sdim", "17")) + "x): " + formatShort(player.sdim.dimensionAmounts[6]) + " (+" + formatShort(player.sdim.dimensionsGain[6]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 6], ["buyable", 17]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                    ["row", [
                        ["column", [
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(8) ? "8th dimension power: " + formatShort(player.sdim.dimensionPower[7]) + " (+" + formatShort(player.sdim.dimensionPowerPerSecond[7]) + "/s, x" + formatShort(player.sdim.dimensionPowerEffects[7]) + " 7D)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ["raw-html", () => { return getBuyableAmount("sdim", 1).gte(8) ? "8th dimension (" + formatShort(buyableEffect("sdim", "18")) + "x): " + formatShort(player.sdim.dimensionAmounts[7]) + " (+" + formatShort(player.sdim.dimensionsGain[7]) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "700px"}],
                        ["style-row", [["bar", 7], ["buyable", 18]], {border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.au2.starsToGet) + ")"}, () => {
                let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.au2.starsToGet.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return player.au2.starSoftcapActive ? "After " + format(player.au2.starSoftcapStart) + " stars, raise star gain by ^" + format(player.au2.starSoftcapEffect, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return true },
})
