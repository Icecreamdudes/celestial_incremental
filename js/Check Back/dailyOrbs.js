addLayer("ev2", {
    name: "Daily Orbs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Do", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        day: new Decimal(1),
        dayEffect: new Decimal(1),
        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(86400),
                base: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(172800),
                base: new Decimal(1),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(345600),
                base: new Decimal(1),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(604800),
                base: new Decimal(1),
            },
        },
        evoInput: new Decimal(0),
        paraInput: new Decimal(0),
        potentialBoost: new Decimal(1),
        shardBoost: new Decimal(1),

        orbs: new Decimal(0),

        xpTime: new Decimal(6),
        xpGain: new Decimal(0),

        pointTime: new Decimal(4),
        pointGain: new Decimal(0),

        skipTime: new Decimal(2),

        boostTime: new Decimal(5),
        boostGain: new Decimal(0),

        petTime: new Decimal(6),

        doubleTime: new Decimal(4),
        doubleCurrent: new Decimal(0),
    }},
    nodeStyle: {
        background: "#106ccc",
		backgroundOrigin: "border-box",
		borderColor: "black",
    },
    tooltip: "Daily Orbs",
    color: "#96DED1",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev2.timers[0].base = new Decimal(1)
        player.ev2.timers[1].base = new Decimal(1).add(buyableEffect("ev2", 34))
        player.ev2.timers[2].base = new Decimal(1).add(buyableEffect("ev2", 34).mul(2))
        player.ev2.timers[3].base = new Decimal(1).add(buyableEffect("ev2", 34).mul(3))
        for (let i in player.ev2.timers) {
            player.ev2.timers[i].base = player.ev2.timers[i].base.mul(player.ev2.shardBoost)

            player.ev2.timers[i].current = player.ev2.timers[i].current.sub(onepersec.mul(delta))
        }

        player.ev2.potentialBoost = new Decimal(1)
        if (player.ev2.evoInput.gt(0)) player.ev2.potentialBoost = player.ev2.potentialBoost.mul(player.ev2.evoInput.add(1).log(Decimal.div(10, buyableEffect("ev2", 14))).add(1))
        if (player.ev2.paraInput.gt(0)) player.ev2.potentialBoost = player.ev2.potentialBoost.mul(player.ev2.paraInput.add(1).log(3).add(1))

        // DAY EFFECT
        player.ev2.dayEffect = player.ev2.day.add(1).log(Decimal.div(10, buyableEffect("ev2", 13))).add(1)

        // XP PURCHASE
        player.ev2.xpTime = new Decimal(6).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))
        player.ev2.xpGain = new Decimal(0)
        for (let i = 0; i < 8; i++) {
            player.ev2.xpGain = player.ev2.xpGain.add(player.cb.xpTimers[i].average.mul(player.ev2.xpTime.mul(60)))
        }

        // PET POINT PURCHASE
        player.ev2.pointTime = new Decimal(4).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))
        player.ev2.pointGain = new Decimal(0)
        for (let i = 0; i < 9; i++) {
            player.ev2.pointGain = player.ev2.pointGain.add(player.pet.petAverage[i].mul(player.ev2.pointTime.mul(60)))
        }

        // SKIP TIME PURCHASE
        player.ev2.skipTime = new Decimal(2).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))

        // XP BOOST PURCHASE
        player.ev2.boostTime = new Decimal(5).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))
        player.ev2.boostGain = new Decimal(0)
        for (let i = 0; i < 2; i++) {
            player.ev2.boostGain = player.ev2.boostGain.add(player.cb.boostTimers[i].average.mul(player.ev2.boostTime.mul(60)))
        }

        // PET PURCHASE
        player.ev2.petTime = new Decimal(6).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))

        // DOUBLE TIME
        player.ev2.doubleTime = new Decimal(4).mul(player.ev2.dayEffect).mul(buyableEffect("ev2", 23))
        if (player.ev2.doubleCurrent.gt(0)) player.ev2.doubleCurrent = player.ev2.doubleCurrent.sub(delta).max(0)
    },
    clickables: {
        1: {
            title() {return "Multiply your next orb gain by x" + formatSimple(player.ev2.potentialBoost) + "."},
            canClick() { return (player.ev2.evoInput.gt(0) || player.ev2.paraInput.gt(0)) && player.cb.evolutionShards.gte(player.ev2.evoInput) && player.cb.paragonShards.gte(player.ev2.paraInput) && player.ev2.shardBoost.lte(1)},
            unlocked: true,
            tooltip() {
                if (player.ev2.shardBoost.gt(1)) return "Next orb gain already multiplied by x" + formatSimple(player.ev2.shardBoost) + "."
                if (player.cb.evolutionShards.lt(player.ev2.evoInput) || player.cb.paragonShards.lt(player.ev2.paraInput)) return "Not enough shards."
                if (player.ev2.evoInput.lte(0) && player.ev2.paraInput.lte(0)) return "No shards inputted."
                return ""
            },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.ev2.evoInput)
                player.cb.paragonShards = player.cb.paragonShards.sub(player.ev2.paraInput)
                player.ev2.shardBoost = player.ev2.potentialBoost
            },
            style: {width: '180px', minHeight: '50px', borderRadius: "30px"},
        },
        11: {
            title() {return player.ev2.timers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev2.timers[0].current) + "." : "<h3>+" + formatSimple(player.ev2.timers[0].base) + " Orb"},
            canClick() { return player.ev2.timers[0].current.lt(0)},
            unlocked: true,
            onClick() {
                player.ev2.orbs = player.ev2.orbs.add(player.ev2.timers[0].base)
                player.ev2.timers[0].current = player.ev2.timers[0].max
                player.ev2.shardBoost = new Decimal(1)
                player.ev2.day = player.ev2.day.add(1)
                doPopup("none", "+" + formatSimple(player.ev2.timers[0].base) + " orbs!", "Resource Obtained!", 5, "#96DED1", "resources/orbs.png")
            },
            style: {width: '200px', minHeight: '50px', borderRadius: "30px / 15px"},
        },
        12: {
            title() {return player.ev2.timers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev2.timers[1].current) + "." : "<h3>+" + formatSimple(player.ev2.timers[1].base) + " Orb"},
            canClick() { return player.ev2.timers[1].current.lt(0)},
            unlocked() {return getLevelableAmount("pet", 1203).gte(3)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.add(player.ev2.timers[1].base)
                player.ev2.timers[1].current = player.ev2.timers[1].max
                player.ev2.shardBoost = new Decimal(1)
                doPopup("none", "+" + formatSimple(player.ev2.timers[1].base) + " orbs!", "Resource Obtained!", 5, "#96DED1", "resources/orbs.png")
            },
            style: {width: '200px', minHeight: '50px', borderRadius: "30px / 15px"},
        },
        13: {
            title() {return player.ev2.timers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev2.timers[2].current) + "." : "<h3>+" + formatSimple(player.ev2.timers[2].base) + " Orb"},
            canClick() { return player.ev2.timers[2].current.lt(0)},
            unlocked() {return getLevelableAmount("pet", 1203).gte(6)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.add(player.ev2.timers[2].base)
                player.ev2.timers[2].current = player.ev2.timers[2].max
                player.ev2.shardBoost = new Decimal(1)
                doPopup("none", "+" + formatSimple(player.ev2.timers[2].base) + " orbs!", "Resource Obtained!", 5, "#96DED1", "resources/orbs.png")
            },
            style: {width: '200px', minHeight: '50px', borderRadius: "30px / 15px"},
        },
        14: {
            title() {return player.ev2.timers[3].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev2.timers[3].current) + "." : "<h3>+" + formatSimple(player.ev2.timers[3].base) + " Orb"},
            canClick() { return player.ev2.timers[3].current.lt(0)},
            unlocked() {return getLevelableAmount("pet", 1203).gte(10)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.add(player.ev2.timers[3].base)
                player.ev2.timers[3].current = player.ev2.timers[3].max
                player.ev2.shardBoost = new Decimal(1)
                doPopup("none", "+" + formatSimple(player.ev2.timers[3].base) + " orbs!", "Resource Obtained!", 5, "#96DED1", "resources/orbs.png")
            },
            style: {width: '200px', minHeight: '50px', borderRadius: "30px / 15px"},
        },
        21: {
            title() {return "Spend an orb to gain<br>" + formatSimple(player.ev2.xpTime, 1) + " minutes of XP"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked: true,
            tooltip() {return "+" + formatSimple(player.ev2.xpGain, 1)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                player.cb.totalxp = player.cb.totalxp.add(player.ev2.xpGain)
                player.cb.xp = player.cb.xp.add(player.ev2.xpGain)
                doPopup("none", "+" + formatWhole(player.ev2.xpGain) + " xp!", "Resource Obtained!", 5, "#0098E5", "resources/level.png")
            },
            style: {width: "250px", minHeight: "60px", fontSize: "9px", borderRadius: "30px", margin: "5px"},
        },
        22: {
            title() {return "Spend an orb to gain<br>" + formatSimple(player.ev2.pointTime, 1) + " minutes of Pet Points"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked: true,
            tooltip() {return "+" + formatSimple(player.ev2.pointGain, 1)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                player.cb.petPoints = player.cb.petPoints.add(player.ev2.pointGain)
                doPopup("none", "+" + formatWhole(player.ev2.pointGain) + " pet points!", "Resource Obtained!", 5, "#A2D800", "resources/petPoint.png")
            },
            style: {width: "250px", minHeight: "60px", fontSize: "9px", borderRadius: "30px", margin: "5px"},
        },
        23: {
            title() {return "Spend an orb to skip forward <br>" + formatSimple(player.ev2.skipTime, 1) + " minutes into the future"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked: true,
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                layers.cb.instantProduction(player.ev2.skipTime.mul(60))
            },
            style: {width: "250px", minHeight: "60px", fontSize: "9px", borderRadius: "30px", margin: "5px"},
        },
        24: {
            title() {return "Spend an orb to gain<br>" + formatSimple(player.ev2.boostTime, 1) + " minutes of XPBoost"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked() {return player.ev.evolutionsUnlocked[10]},
            tooltip() {return "+" + formatSimple(player.ev2.boostGain, 1)},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                player.cb.XPBoost = player.cb.XPBoost.add(player.ev2.boostGain)
                doPopup("none", "+" + formatWhole(player.ev2.boostGain) + " XPBoost!", "Resource Obtained!", 5, "#00B229", "resources/XPBoost.png")
            },
            style: {width: "250px", minHeight: "60px", fontSize: "9px", borderRadius: "30px", margin: "5px"},
        },
        25: {
            title() {return "Spend an orb to gain<br>" + formatSimple(player.ev2.petTime, 1) + " minutes of crate rolls"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked() {return player.ev.evolutionsUnlocked[10]},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                layers.cb.petButton1(player.cb.crateTimers[0].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton2(player.cb.crateTimers[1].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton3(player.cb.crateTimers[2].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton4(player.cb.crateTimers[3].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton5(player.cb.crateTimers[4].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton6(player.cb.crateTimers[5].average.mul(player.ev2.petTime.mul(60)))
                layers.cb.petButton7(player.cb.crateTimers[6].average.mul(player.ev2.petTime.mul(60)))
            },
            style: {width: "250px", minHeight: "60px", fontSize: "9px", borderRadius: "30px", margin: "5px"},
        },
        26: {
            title() {return "Spend an orb to gain<br>+" + formatSimple(player.ev2.doubleTime, 1) + " minutes of x" + formatSimple(Decimal.add(2, buyableEffect("ev2", 33)), 1) + " CB Tickspeed<br>[" + formatTime(player.ev2.doubleCurrent) + "]"},
            canClick() {return player.ev2.orbs.gte(1)},
            unlocked() {return player.ev.evolutionsUnlocked[10]},
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(1)

                player.ev2.doubleCurrent = player.ev2.doubleCurrent.add(player.ev2.doubleTime.mul(60))
            },
            style: {width: "250px", minHeight: "60px", fontSize: "8px", borderRadius: "30px", margin: "5px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.evolutionShards},
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ES Level Req"
            },
            display() {
                return "which are dividing CB Level Requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#d487fd'},
        },
        12: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.cb.evolutionShards},
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ES XPBoost Improver"
            },
            display() {
                return "which are dividing XPBoost cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#d487fd'},
        },
        13: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.evolutionShards},
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ES Day Enhancer"
            },
            display() {
                return "which are dividing day effect log by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#d487fd'},
        },
        14: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.cb.evolutionShards},
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ES Orb Enhancer"
            },
            display() {
                return "which are dividing ES orb multiplier log by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#d487fd'},
        },

        21: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "PS Crate Rolls"
            },
            display() {
                return "which are multiplying crate roll chance by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#4c64ff'},
        },
        22: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "PS Point Cooldown"
            },
            display() {
                return "which are dividing pet point cooldowns by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#4c64ff'},
        },
        23: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "PS Orb Effect"
            },
            display() {
                return "which are multiplying orb effects by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#4c64ff'},
        },
        24: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "PS Orb Enhancer"
            },
            display() {
                return "which are dividing PS orb multiplier log by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#4c64ff'},
        },

        31: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.ev2.orbs},
            pay(amt) { player.ev2.orbs = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10)},
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).mul(this.costGrowth()).add(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Orb ES Chance"
            },
            display() {
                return "which are adding +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + " to the XP button ESC multiplier.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Orbs"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).mul(this.costGrowth()).add(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px'},
        },
        32: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.ev2.orbs},
            pay(amt) { player.ev2.orbs = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(50).add(1)},
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).mul(this.costGrowth()).add(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Orb CB Tickspeed"
            },
            display() {
                return "which are multiplying CB Tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Orbs"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).mul(this.costGrowth()).add(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px'},
        },
        33: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.ev2.orbs},
            pay(amt) { player.ev2.orbs = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10)},
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).mul(this.costGrowth()).add(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Orb Speed Effect"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the 6th orb effects multiplier.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Orbs"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).mul(this.costGrowth()).add(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px'},
        },
        34: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.ev2.orbs},
            pay(amt) { player.ev2.orbs = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(5)},
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).mul(this.costGrowth()).add(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Orb Button Enhancer"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " orbs starting at orb button 2, increasing with each button.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Orbs"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).mul(this.costGrowth()).add(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px'},
        },
    },
    microtabs: {
        Tabs: {
            "Evo-Shards": {
                content: [
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12]]],
                    ["row", [["ex-buyable", 13], ["ex-buyable", 14]]],
                ]
            },
            "Para-Shards": {
                content: [
                    ["row", [["ex-buyable", 21], ["ex-buyable", 22]]],
                    ["row", [["ex-buyable", 23], ["ex-buyable", 24]]],
                ]
            },
            "Orbs": {
                content: [
                    ["row", [["ex-buyable", 31], ["ex-buyable", 32]]],
                    ["row", [["ex-buyable", 33], ["ex-buyable", 34]]],
                ]
            },
        },
    },
    tabFormat: [
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/orbs.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatSimple(player.ev2.orbs, 1)}, {width: "68px", height: "50px", color: "#96DED1", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Orbs<hr><small>(Gained from Daily Buttons)</small></div>"],
            ], {width: "123px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "68px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(35) ? {width: "123px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "68px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(250) ? {width: "125px", height: "50px"} : {display: "none !important"}}],
        ], {width: "375px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["style-column", [
            ["raw-html", () => {return "<h2>Day " + formatWhole(player.ev2.day) }, {color: "white", fontSize: "30px", fontFamily: "monospace"}],
            ["raw-html", () => {return "Boosts orb effects by x" + formatSimple(player.ev2.dayEffect, 1)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}]
        ], {width: "265px", height: "80px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "10px"}],
        ["blank", "25px"],
        ["row", [
            ["top-column", [
                ["clickable", 11],
                ["clickable", 12],
                ["clickable", 13],
                ["clickable", 14],
                ["raw-html", () => {return getLevelableAmount("pet", 1203).gte(10) ? "" : getLevelableAmount("pet", 1203).gte(6) ? "Next button unlocked at Insane Face Lv10" : getLevelableAmount("pet", 1203).gte(3) ? "Next button unlocked at Insane Face Lv6" : "Next button unlocked at Insane Face Lv3"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
            ], {width: "200px", height: "200px", padding: "10px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "10px"}],
            ["top-column", [
                ["raw-html", "Evo-Shards", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["blank", "5px"],
                ["text-input", "evoInput", {width: "160px", height: "40px", backgroundColor: "rgba(0,0,0,0.4)", color: "white", fontSize: "20px", border: "0px", padding: "0px 10px"}],
                ["blank", "5px"],
                ["raw-html", "Para-Shards", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["blank", "5px"],
                ["text-input", "paraInput", {width: "160px", height: "40px", backgroundColor: "rgba(0,0,0,0.4)", color: "white", fontSize: "20px", border: "0px", padding: "0px 10px"}],
                ["blank", "8px"],
                ["clickable", 1],
            ], () => {return player.ev.evolutionsUnlocked[10] ? {width: "200px", height: "200px", padding: "10px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "10px", marginLeft: "20px"} : {display: "none !important"}}],
        ]],
        ["blank", "25px"],
        ["style-column", [
            ["row", [["clickable", 21], ["clickable", 22], ["clickable", 23]]],
            ["row", [["clickable", 24], ["clickable", 25], ["clickable", 26]]],
        ], {width: "780px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "20px", padding: "5px"}],
        ["blank", "25px"],
        ["top-column", [
            ["row", [
                ["category-button", ["Evolution Shards", "Tabs", "Evo-Shards"], {width: "193px", height: "40px", background: "rgba(0,0,0,0.4)", borderRadius: "20px 0 0 0"}],
                ["category-button", ["Paragon Shards", "Tabs", "Para-Shards"], {width: "194px", height: "40px", background: "rgba(0,0,0,0.4)"}],
                ["category-button", ["Orbs", "Tabs", "Orbs"], {width: "193px", height: "40px", background: "rgba(0,0,0,0.4)", borderRadius: "0 20px 0 0"}],
            ]],
            ["buttonless-microtabs", "Tabs", {borderWidth: "0"}],
        ], () => {return player.ev.evolutionsUnlocked[9] ? {width: "580px", height: "360px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "20px"} : {display: "none !important"}}],
        ["blank", "25px"],
    ],
    layerShown() {return player.ev.evolutionsUnlocked[2]}
})