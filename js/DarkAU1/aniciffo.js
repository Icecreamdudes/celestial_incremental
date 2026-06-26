addLayer("ani", {
    name: "Aniciffo, the Celestial of Radioactivity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☣︎ ", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        darkRadiation: new Decimal(0),
        darkRadiationEffect: new Decimal(1),
        darkRadiationEffect2: new Decimal(1),
        darkRadiationToGet: new Decimal(1),

        timer: {
            current: new Decimal(0),
            max: new Decimal(3),
        },

        radiation: {
            red: {
                current: new Decimal(0),
                max: new Decimal(6),
                amount: new Decimal(0),
                toGet: new Decimal(0),
                cost: new Decimal(5),
                effect: new Decimal(1),
            },
            orange: {
                current: new Decimal(0),
                max: new Decimal(9),
                amount: new Decimal(0),
                toGet: new Decimal(0),
                cost: new Decimal(5),
                effect: new Decimal(1),
            },
            yellow: {
                current: new Decimal(0),
                max: new Decimal(12),
                amount: new Decimal(0),
                toGet: new Decimal(0),
                cost: new Decimal(5),
                effect: new Decimal(1),
            },
            green: {
                current: new Decimal(0),
                max: new Decimal(10),
                amount: new Decimal(0),
                toGet: new Decimal(0),
                cost: new Decimal(250),
                effect: new Decimal(1),
            },
        },

        stones: {
            temporal: {
                amount: new Decimal(0),
                toGet: new Decimal(0),
                effect: new Decimal(1),
            },
            cosmic: {
                amount: new Decimal(0),
                toGet: new Decimal(0),
                effect: new Decimal(1),
            },
        },
    }},
    automate() {
        if (hasUpgrade("ani", 23)) {
            buyBuyable("ani", 11)
            buyBuyable("ani", 12)
            buyBuyable("ani", 13)
            buyBuyable("ani", 14)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(145deg, #1d901a 0%, #6dc464 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#74ff8f",
            color: "#f6fff5",
        };
    },
    tooltip: "Aniciffo, the Celestial of Radioactivity",
    branches: [["tr", "#74ff8f"], ["sr", "#74ff8f"]],
    color: "black",
    update(delta) {
        player.ani.timer.max = new Decimal(3)
        player.ani.timer.max = player.ani.timer.max.div(buyableEffect("ani", 13))

        player.ani.darkRadiationToGet = new Decimal(1)
        player.ani.darkRadiationToGet = player.ani.darkRadiationToGet.mul(player.ani.radiation.red.effect)
        player.ani.darkRadiationToGet = player.ani.darkRadiationToGet.mul(buyableEffect("ani", 11))
        player.ani.darkRadiationToGet = player.ani.darkRadiationToGet.mul(player.tr.radiation.effect2)
        player.ani.darkRadiationToGet = player.ani.darkRadiationToGet.mul(player.sr.radiation.effect2)
        player.ani.darkRadiationToGet = player.ani.darkRadiationToGet.mul(buyableEffect("ani", 21))

        if (player.ani.darkRadiation.div(3).pow(0.65).add(1).lte(1e6))
        {
            player.ani.darkRadiationEffect = player.ani.darkRadiation.div(3).pow(0.65).add(1) //tickspeed
        } else
        {
            player.ani.darkRadiationEffect = player.ani.darkRadiation.sub(5e9).div(3).pow(0.45).add(1e6) //tickspeed
        }


        player.ani.darkRadiationEffect2 = player.ani.darkRadiation.pow(0.35).add(1) //space

        if (player.ani.timer.current.lt(0)) {
            makeShinies(darkRadiation, new Decimal(1))
            player.ani.timer.current = player.ani.timer.max
        }

        //red
        player.ani.radiation.red.effect = player.ani.radiation.red.amount.pow(0.65).add(1)

        player.ani.radiation.red.cost = player.ani.radiation.red.amount.add(1).pow(0.875).mul(5)
        if (hasUpgrade("ani", 12)) player.ani.radiation.red.cost = player.ani.radiation.red.cost.div(3)
        player.ani.radiation.red.cost = player.ani.radiation.red.cost.div(buyableEffect("ani", 14))

        player.ani.radiation.red.toGet = new Decimal(1)
        if (hasUpgrade("ani", 12)) player.ani.radiation.red.toGet = player.ani.radiation.red.toGet.mul(1.5)
        player.ani.radiation.red.toGet = player.ani.radiation.red.toGet.mul(player.ani.radiation.orange.effect)
        player.ani.radiation.red.toGet = player.ani.radiation.red.toGet.mul(buyableEffect("ani", 12))
        player.ani.radiation.red.toGet = player.ani.radiation.red.toGet.mul(buyableEffect("tr", 14))
        player.ani.radiation.red.toGet = player.ani.radiation.red.toGet.mul(buyableEffect("ani", 31))

        player.ani.radiation.red.max = new Decimal(6)
        if (hasUpgrade("ani", 19)) player.ani.radiation.red.max = player.ani.radiation.red.max.div(3)

        if (player.ani.radiation.red.current.lt(0)) {
            makeShinies(redRadiation, new Decimal(1))
            player.ani.radiation.red.current = player.ani.radiation.red.max
        }

        //orange
        player.ani.radiation.orange.effect = player.ani.radiation.orange.amount.pow(0.65).add(1)

        player.ani.radiation.orange.cost = player.ani.radiation.orange.amount.add(1).pow(0.9).mul(5)
        player.ani.radiation.orange.cost = player.ani.radiation.orange.cost.div(buyableEffect("ani", 14))

        player.ani.radiation.orange.toGet = new Decimal(1)
        player.ani.radiation.orange.toGet = player.ani.radiation.orange.toGet.mul(buyableEffect("ani", 12))
        player.ani.radiation.orange.toGet = player.ani.radiation.orange.toGet.mul(player.ani.radiation.yellow.effect)
        player.ani.radiation.orange.toGet = player.ani.radiation.orange.toGet.mul(buyableEffect("tr", 15))
        player.ani.radiation.orange.toGet = player.ani.radiation.orange.toGet.mul(buyableEffect("ani", 31))

        player.ani.radiation.orange.max = new Decimal(9)
        if (hasUpgrade("ani", 19)) player.ani.radiation.orange.max = player.ani.radiation.orange.max.div(3)

        if (player.ani.radiation.orange.current.lt(0)) {
            makeShinies(orangeRadiation, new Decimal(1))
            player.ani.radiation.orange.current = player.ani.radiation.orange.max
        }

        //yellow
        player.ani.radiation.yellow.effect = player.ani.radiation.yellow.amount.pow(0.65).add(1)

        player.ani.radiation.yellow.cost = player.ani.radiation.yellow.amount.add(1).pow(0.925).mul(5)
        player.ani.radiation.yellow.cost = player.ani.radiation.yellow.cost.div(buyableEffect("ani", 14))

        player.ani.radiation.yellow.toGet = new Decimal(1)
        player.ani.radiation.yellow.toGet = player.ani.radiation.yellow.toGet.mul(buyableEffect("ani", 12))
        player.ani.radiation.yellow.toGet = player.ani.radiation.yellow.toGet.mul(buyableEffect("tr", 16))
        player.ani.radiation.yellow.toGet = player.ani.radiation.yellow.toGet.mul(player.ani.radiation.green.effect)
        player.ani.radiation.yellow.toGet = player.ani.radiation.yellow.toGet.mul(buyableEffect("ani", 31))

        player.ani.radiation.yellow.max = new Decimal(12)
        if (hasUpgrade("ani", 19)) player.ani.radiation.yellow.max = player.ani.radiation.yellow.max.div(3)

        if (player.ani.radiation.yellow.current.lt(0)) {
            makeShinies(yellowRadiation, new Decimal(1))
            player.ani.radiation.yellow.current = player.ani.radiation.yellow.max
        }
        
        //green
        player.ani.radiation.green.effect = player.ani.radiation.green.amount.pow(0.65).add(1)

        player.ani.radiation.green.cost = player.ani.radiation.green.amount.add(1).mul(250)

        player.ani.radiation.green.toGet = new Decimal(1)

        player.ani.radiation.green.max = new Decimal(10)

        if (player.ani.radiation.green.current.lt(0)) {
            makeShinies(greenRadiation, new Decimal(1))
            player.ani.radiation.green.current = player.ani.radiation.green.max
        }

        if (player.musuniverse == "AD1") {
            player.ani.timer.current = player.ani.timer.current.sub(delta)
            if (hasUpgrade("ani", 11)) player.ani.radiation.red.current = player.ani.radiation.red.current.sub(delta)
            if (hasUpgrade("ani", 13)) player.ani.radiation.orange.current = player.ani.radiation.orange.current.sub(delta)
            if (hasUpgrade("ani", 14)) player.ani.radiation.yellow.current = player.ani.radiation.yellow.current.sub(delta)
            if (hasUpgrade("ani", 21)) player.ani.radiation.green.current = player.ani.radiation.green.current.sub(delta)
        }




        // RADIATION STONES

        if (player.pet.legPetTimers[0].active && player.le.resetAmount.gte(9) && getLevelableTier("pu", 403, true))  {
            player.ani.stones.temporal.toGet = player.le.resetAmount.sub(8).pow(1.75).mul(3)
            player.ani.stones.temporal.toGet = player.ani.stones.temporal.toGet.mul(buyableEffect("ani", 34))
        } else {
            player.ani.stones.temporal.toGet = new Decimal(0)
        }
        player.ani.stones.temporal.effect = player.ani.stones.temporal.amount.pow(0.35).div(3).add(1) //eclipse shards

        if (!player.pet.legPetTimers[0].active && player.le.resetAmount.gte(9) && getLevelableTier("pu", 403, true))  {
            player.ani.stones.cosmic.toGet = player.le.resetAmount.sub(10).pow(1.5)
            player.ani.stones.cosmic.toGet = player.ani.stones.cosmic.toGet.mul(buyableEffect("ani", 24))
        } else {
            player.ani.stones.cosmic.toGet = new Decimal(0)
        }
        player.ani.stones.cosmic.effect = player.ani.stones.cosmic.amount.pow(0.5).div(2).add(1) //SMA
    },
    bars: {},
    clickables: {
    },
    upgrades: {
        11: {
            title: "Aniciffo Upgrade I",
            unlocked() { return true },
            description: "Unlock red radiation.",
            cost: new Decimal(10),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        12: {
            title: "Aniciffo Upgrade II",
            unlocked() { return hasUpgrade("ani", 11) },
            description: "Red radiation is 3x cheaper and is boosted by x1.5.",
            cost: new Decimal(50),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        13: {
            title: "Aniciffo Upgrade III",
            unlocked() { return hasUpgrade("ani", 12) },
            description: "Unlock orange radiation and buyables.",
            cost: new Decimal(250),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        14: {
            title: "Aniciffo Upgrade IV",
            unlocked() { return hasUpgrade("ani", 13) },
            description: "Unlock yellow radiation.",
            cost: new Decimal(5000),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        15: {
            title: "Aniciffo Upgrade V",
            unlocked() { return hasUpgrade("ani", 14) },
            description: "Unlock time radiation.",
            cost: new Decimal(25000),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        16: {
            title: "Aniciffo Upgrade VI",
            unlocked() { return hasUpgrade("ani", 15) },
            description: "Unlock the ability to use the Aniciffo punchcard in non-eclipse runs.",
            cost: new Decimal(10000000),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", width:"125px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        17: {
            title: "Aniciffo Upgrade VII",
            unlocked() { return hasUpgrade("ani", 16) },
            description: "Unlock space radiation.",
            cost: new Decimal(35000000),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        18: {
            title: "Aniciffo Upgrade VIII",
            unlocked() { return hasUpgrade("ani", 17) },
            description: "Autobuy all space and space energy buyables (even when aniciffo is inactive) and remove the time requirement for the aniciffo punchcard.",
            cost: new Decimal(5e8),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", width:"175px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        19: {
            title: "Aniciffo Upgrade IX",
            unlocked() { return hasUpgrade("ani", 18) },
            description: "Boosters no longer reset anything (yes, even when aniciffo is inactive) and also reduce ROY cooldowns by /3.",
            cost: new Decimal(1.5e9),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", width:"175px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        21: {
            title: "Aniciffo Upgrade X",
            unlocked() { return hasUpgrade("ani", 19) },
            description: "Unlock green radiation.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        22: {
            title: "Aniciffo Upgrade XI",
            unlocked() { return hasUpgrade("ani", 21) },
            description: "Unlock radiation stones. (Tab available in SMA)",
            cost: new Decimal(5e10),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
        23: {
            title: "Aniciffo Upgrade XII",
            unlocked() { return hasUpgrade("ani", 22) },
            description: "Autobuy dark radiation buyables.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.ani },
            currencyDisplayName: "Dark Radiation",
            currencyInternalName: "darkRadiation",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#74ff8f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#048500" : look.backgroundColor = "#adffaa"
                return look
            }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.ani.darkRadiation},
            pay(amt) { player.ani.darkRadiation = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1).pow(1.2)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Radiation Boost"
            },
            display() {
                return "which are boosting dark radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Radiation"
            },
            buy(mult) {
                if (mult != true && (!hasUpgrade("ani", 23))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("ani", 23)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.ani.darkRadiation},
            pay(amt) { player.ani.darkRadiation = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ROY Boost"
            },
            display() {
                return "which are boosting red, orange, and yellow radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Radiation"
            },
            buy(mult) {
                if (mult != true && (!hasUpgrade("ani", 23))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("ani", 23)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ani.darkRadiation},
            pay(amt) { player.ani.darkRadiation = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.85).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Splitter"
            },
            display() {
                return "which are dividing dark radiation spawn interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Radiation"
            },
            buy(mult) {
                if (mult != true && (!hasUpgrade("ani", 23))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("ani", 23)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        14: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.ani.darkRadiation},
            pay(amt) { player.ani.darkRadiation = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.5).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ROY Affordability Boost"
            },
            display() {
                return "which are dividing red, orange, and yellow radiation costs by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Radiation"
            },
            buy(mult) {
                if (mult != true && (!hasUpgrade("ani", 23))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("ani", 23)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },

        //radiation stones
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ani.stones.temporal.amount},
            pay(amt) { player.ani.stones.temporal.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(2, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Radiation Multiplier"
            },
            display() {
                return "which are boosting dark radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Temporal Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        22: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.ani.stones.temporal.amount},
            pay(amt) { player.ani.stones.temporal.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.9).mul(0.5).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Boost"
            },
            display() {
                return "which are boosting check back XP by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Temporal Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        23: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ani.stones.temporal.amount},
            pay(amt) { player.ani.stones.temporal.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Normality Effect Booster"
            },
            display() {
                return "which are raising normality effect by ^" + format(tmp[this.layer].buyables[this.id].effect) + " (only when Aniciffo punchcard is active).\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Temporal Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        24: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ani.stones.temporal.amount},
            pay(amt) { player.ani.stones.temporal.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.3).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cosmic Stone Boost"
            },
            display() {
                return "which are boosting cosmic radiation stone gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Temporal Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },

        31: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(75) },
            currency() { return player.ani.stones.cosmic.amount},
            pay(amt) { player.ani.stones.cosmic.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "ROY Radiation Multiplier"
            },
            display() {
                return "which are boosting ROY radiation gainby x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cosmic Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        32: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ani.stones.cosmic.amount},
            pay(amt) { player.ani.stones.cosmic.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.04)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Space Building Empowerer"
            },
            display() {
                return "which increase space building effects by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cosmic Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        33: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ani.stones.cosmic.amount},
            pay(amt) { player.ani.stones.cosmic.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.35).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Booster Booster"
            },
            display() {
                return "which raise booster effect by ^" + format(tmp[this.layer].buyables[this.id].effect) + " (only when Aniciffo punchcard is active).\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cosmic Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        34: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ani.stones.cosmic.amount},
            pay(amt) { player.ani.stones.cosmic.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.3).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Stone Boost"
            },
            display() {
                return "which are boosting temporal radiation stone gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cosmic Radiation Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
  
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "All Alt-Dark Universe 1 content is kept throughout Dark Universe 1 runs." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "All effects that boost Dark Universe 1 are only active with the aniciffo punchcard." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17],]],
                    ["row", [["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23],]],
                ]
            },
            "Buyables": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("ani", 13) },
                content: [
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]]],
                ]
            },
            "Color Radiation": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return hasUpgrade("ani", 11) ? "You have <h3>" + format(player.ani.radiation.red.amount) + "</h3> red radiation. (+" + format(player.ani.radiation.red.toGet) + "/" + formatTime(player.ani.radiation.red.max) + ")" : "" }, {color: "#d30a00", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 11) ? "Boosts dark radiation gain by x<h3>" + format(player.ani.radiation.red.effect) + "</h3>." : "" }, {color: "#d30a00", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 11) ? "Costs <h3>" + format(player.ani.radiation.red.cost) + "</h3> dark radiation." : "" }, {color: "#d30a00", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return hasUpgrade("ani", 13) ? "You have <h3>" + format(player.ani.radiation.orange.amount) + "</h3> orange radiation. (+" + format(player.ani.radiation.orange.toGet) + "/" + formatTime(player.ani.radiation.orange.max) + ")" : "" }, {color: "#ee7a0b", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 13) ? "Boosts red radiation gain by x<h3>" + format(player.ani.radiation.orange.effect) + "</h3>." : "" }, {color: "#ee7a0b", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 13) ? "Costs <h3>" + format(player.ani.radiation.orange.cost) + "</h3> red radiation." : "" }, {color: "#ee7a0b", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return hasUpgrade("ani", 14) ? "You have <h3>" + format(player.ani.radiation.yellow.amount) + "</h3> yellow radiation. (+" + format(player.ani.radiation.yellow.toGet) + "/" + formatTime(player.ani.radiation.yellow.max) + ")" : "" }, {color: "#ffdb18", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 14) ? "Boosts orange radiation gain by x<h3>" + format(player.ani.radiation.yellow.effect) + "</h3>." : "" }, {color: "#ffdb18", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 14) ? "Costs <h3>" + format(player.ani.radiation.yellow.cost) + "</h3> orange radiation." : "" }, {color: "#ffdb18", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return hasUpgrade("ani", 21) ? "You have <h3>" + format(player.ani.radiation.green.amount) + "</h3> green radiation. (+" + format(player.ani.radiation.green.toGet) + "/" + formatTime(player.ani.radiation.green.max) + ")" : "" }, {color: "#38dc33", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 21) ? "Boosts yellow radiation gain by x<h3>" + format(player.ani.radiation.green.effect) + "</h3>." : "" }, {color: "#38dc33", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return hasUpgrade("ani", 21) ? "Costs <h3>" + format(player.ani.radiation.green.cost) + "</h3> yellow radiation." : "" }, {color: "#38dc33", fontSize: "16px", fontFamily: "monospace"}],
                ]
            },
            "Radiation Stones": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("ani", 22) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Both radiation stone types are gained based on dark universe 1 resets and claimed on leaving dark universe 1." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Dark universe 1 reset amount must be greater than amount required for unlocking Aniciffo punchcard." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.ani.stones.temporal.amount) + "</h3> temporal radiation stones. (+" + format(player.ani.stones.temporal.toGet) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts eclipse shard gain by x" + format(player.ani.stones.temporal.effect) + "." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]]],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.ani.stones.cosmic.amount) + "</h3> cosmic radiation stones. (+" + format(player.ani.stones.cosmic.toGet) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts SMA gain by x" + format(player.ani.stones.cosmic.effect) + "." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34]]],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.ani.darkRadiationEffect.gte(1e6) && player.pet.legPetTimers[0].active ? "[EFFECT SOFTCAPPED]" : "" }, {color: "red", fontSize: "12px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && getLevelableTier("pu", 403, true)},
    deactivated() { return false},
})
const darkRadiation = {
    image: "resources/radiation/darkRadiation.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        player.ani.darkRadiation = player.ani.darkRadiation.add(player.ani.darkRadiationToGet)

        player.sr.spaceDecay = player.sr.spaceDecay.add(player.sr.spaceDecayPerClick)

        for (let i = 0; i < player.sr.generators.amount.length; i++) {
            player.sr.generators.amount[i] = player.sr.generators.amount[i].add(player.sr.generators.perClick[i])
        }
        
        Vue.delete(particles, this.id)
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.ani.darkRadiationToGet) + " Dark Radiation</small>"})
    },
}
const redRadiation = {
    image: "resources/radiation/redRadiation.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.ani.darkRadiation.gte(player.ani.radiation.red.cost)) {
            player.ani.radiation.red.amount = player.ani.radiation.red.amount.add(player.ani.radiation.red.toGet)
            player.ani.darkRadiation = player.ani.darkRadiation.sub(player.ani.radiation.red.cost)
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.ani.radiation.red.toGet) + " Red Radiation<br>-" + format(player.ani.radiation.red.cost) + " Dark Radiation</small>"})
        } else
        {
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Can't afford!</small>"})
        }
    },
}
const orangeRadiation = {
    image: "resources/radiation/orangeRadiation.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.ani.radiation.red.amount.gte(player.ani.radiation.orange.cost)) {
            player.ani.radiation.orange.amount = player.ani.radiation.orange.amount.add(player.ani.radiation.orange.toGet)
            player.ani.radiation.red.amount = player.ani.radiation.red.amount.sub(player.ani.radiation.orange.cost)
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.ani.radiation.orange.toGet) + " Orange Radiation<br>-" + format(player.ani.radiation.orange.cost) + " Red Radiation</small>"})
        } else
        {
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Can't afford!</small>"})
        }
    },
}
const yellowRadiation = {
    image: "resources/radiation/yellowRadiation.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.ani.radiation.orange.amount.gte(player.ani.radiation.yellow.cost)) {
            player.ani.radiation.yellow.amount = player.ani.radiation.yellow.amount.add(player.ani.radiation.yellow.toGet)
            player.ani.radiation.orange.amount = player.ani.radiation.orange.amount.sub(player.ani.radiation.yellow.cost)
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.ani.radiation.yellow.toGet) + " Yellow Radiation<br>-" + format(player.ani.radiation.yellow.cost) + " Orange Radiation</small>"})
        } else
        {
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Can't afford!</small>"})
        }
    },
}
const greenRadiation = {
    image: "resources/radiation/greenRadiation.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.ani.radiation.yellow.amount.gte(player.ani.radiation.green.cost)) {
            player.ani.radiation.green.amount = player.ani.radiation.green.amount.add(player.ani.radiation.green.toGet)
            player.ani.radiation.yellow.amount = player.ani.radiation.yellow.amount.sub(player.ani.radiation.green.cost)
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.ani.radiation.green.toGet) + " Green Radiation<br>-" + format(player.ani.radiation.green.cost) + " Yellow Radiation</small>"})
        } else
        {
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Can't afford!</small>"})
        }
    },
}
const radiationText = {
    image: "",
    text: "Test<br><small>This is a test!</small>",
    time: 1,
    fadeOutTime: 1,
    class: "bigCookieNumbers",
}