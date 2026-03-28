addLayer("n", {
    name: "Nests", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        nest: new Decimal(0),
        nestGain: new Decimal(0),
        highestNest: new Decimal(0),
        nestReset: new Decimal(0),
        nestEffect: new Decimal(1),

        flowerPercentage: new Decimal(0.01),
        milestone8Effect: new Decimal(1),
        milestone14Effect: new Decimal(1),

        pylonEnergyMax: new Decimal(1e6),
        pylonEnergy: new Decimal(0),
        pylonEnergyEffect: new Decimal(1),
        pylonEnergyEffect2: new Decimal(1),
        pylonEnergyEffect3: new Decimal(1),
        pylonEnergyPerSecond: new Decimal(0),
        
        pylonPassiveEffect: new Decimal(1),

        pylonTier: new Decimal(1),
        pylonTierEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(135deg, #E5BD3F, #E172B5)",
            borderColor: "#714c3d"
        }
    },
    tooltip: "Nests",
    color: "#E3987A",
    branches: ["al"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (hasUpgrade("n", 31)) {
            player.n.nestGain = Decimal.pow(2, player.al.honeycomb.mul(player.al.royalJelly).div(1e60).add(1).log(1e20))
        } else {
            player.n.nestGain = new Decimal(1)
        }

        player.n.nestGain = player.n.nestGain.mul(buyableEffect("n", 42))

        player.n.nestGain = player.n.nestGain.floor() // KEEP AT END

        player.n.nestEffect = Decimal.pow("1e10000", player.n.highestNest.pow(0.7))

        player.n.flowerPercentage = new Decimal(0.01)
        if (hasMilestone("n", 19)) player.n.flowerPercentage = player.n.flowerPercentage.add(Decimal.div(player.n.milestones.length-8, 100))

        player.n.milestone8Effect = new Decimal(1)
        player.n.milestone8Effect = player.n.milestone8Effect.add(Decimal.div(player.n.upgrades.length, 100))
        for (let i in player.n.buyables) {
            player.n.milestone8Effect = player.n.milestone8Effect.add(Decimal.div(player.n.buyables[i], 100))
        }

        player.n.milestone14Effect = player.n.nestReset.pow(0.7).div(100).add(1)
        if (player.n.milestone14Effect.gt(2)) player.n.milestone14Effect = player.n.milestone14Effect.div(2).pow(0.5).mul(2)

        player.n.pylonEnergyMax = Decimal.pow(1e6, player.n.pylonTier)

        if (hasUpgrade("n", 71)) {
            player.n.pylonEnergyPerSecond = new Decimal(1)
            player.n.pylonEnergyPerSecond = player.n.pylonEnergyPerSecond.mul(buyableEffect("n", 1))
            player.n.pylonEnergyPerSecond = player.n.pylonEnergyPerSecond.mul(buyableEffect("n", 2))
            player.n.pylonEnergyPerSecond = player.n.pylonEnergyPerSecond.mul(buyableEffect("n", 3))

            player.n.pylonPassiveEffect = player.bee.bees.add(1).log(10).pow(0.06).div(6).add(1).pow(player.n.pylonTierEffect)
        } else {
            player.n.pylonEnergyPerSecond = new Decimal(0)

            player.n.pylonPassiveEffect = new Decimal(1)
        }

        if (player.n.pylonEnergy.gte(player.n.pylonEnergyMax)) {
            player.n.pylonEnergy = player.n.pylonEnergyMax
            player.n.pylonEnergyPerSecond = new Decimal(0)
        }
        player.n.pylonEnergy = player.n.pylonEnergy.add(player.n.pylonEnergyPerSecond.mul(Decimal.div(delta, player.uni["UB"].tickspeed)))
        
        player.n.pylonEnergyEffect = player.n.pylonEnergy.add(1).log(10).div(10).add(1).pow(player.n.pylonTierEffect)
        player.n.pylonEnergyEffect2 = player.n.pylonEnergy.add(1).log(10).div(20).add(1).pow(player.n.pylonTierEffect)
        player.n.pylonEnergyEffect3 = player.n.pylonEnergy.pow(0.1).add(1).pow(player.n.pylonTierEffect)

        player.n.pylonTierEffect = player.n.pylonTier.sub(1).pow(0.5).div(10).add(1)
    },
    clickables: {
        1: {
            title() { return "<h2>Condense all your previous work<br>into a nest.</h2><br><h3>Requires: 1e25 Honeycombs and Royal Jelly</h3>"},
            canClick() { return player.al.honeycomb.gte(1e25) && player.al.royalJelly.gte(1e25)},
            unlocked: true,
            onClick() {
                player.n.nest = player.n.nest.add(player.n.nestGain)
                player.n.nestReset = player.n.nestReset.add(1)
                if (player.n.nest.gt(player.n.highestNest)) player.n.highestNest = player.n.nest
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.al.prestigeReset(true)
                    }, 100*i)
                }
            },
            style() {
                let look = {width: "500px", minHeight: "100px", borderRadius: "15px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(135deg, #E5BD3F, #E172B5)"
                    look.border = "3px solid #714c3d"
                } else {
                    look.background = "#bf8f8f"
                    look.border = "3px solid rgba(0,0,0,0.5)"
                }
                return look
            },
        },
        2: {
            title() { return "<h2>Tier up the Natural Pylon" },
            canClick() { return player.n.pylonEnergy.gte(player.n.pylonEnergyMax) },
            unlocked() { return player.n.pylonEnergy.gte(player.n.pylonEnergyMax) },
            onClick() {
                player.n.pylonEnergy = new Decimal(0)

                player.n.pylonTier = player.n.pylonTier.add(1)
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "radial-gradient(circle, #007917 80%, #63C964 110%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
    },
    upgrades: {
        11: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 1:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock purple flowers" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1 Nest" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1),
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        21: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 2:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock a honeycomb effect that buffs bees" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1 Nest" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1),
            canAfford() { return hasUpgrade("n", 11)},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        22: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 2:2</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock a royal jelly effect that lightly buffs pre-aleph resources" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1 Nest" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1),
            canAfford() { return hasUpgrade("n", 11)},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        31: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 3:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Honeycombs and royal jelly now effect nest gain" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1 Nest" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1),
            canAfford() { return hasUpgrade("n", 21) || hasUpgrade("n", 22)},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },

        61: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 6:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "TEMP" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "64 Nests" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(64),
            canAfford() { return false},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        // MAKE ONE OF THESE ROW 6 UPGRADES BUFF NESTS
        62: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 6:2</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "TEMP" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "64 Nests" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(64),
            canAfford() { return false},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        71: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 7:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock the natural pylon" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "256 Nests" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(256),
            canAfford() { return hasUpgrade("n", 61) || hasUpgrade("n", 62)},
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },

        // ==--- LATER ON STUFF ---==
        // Unlock wax layer
    },
    buyables: {
        1: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(player.n.highestNest.add(1).log(10).add(1)).add(1)},
            unlocked() { return hasUpgrade("n", 71) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Pylon Factor I"
            },
            display() {
                return 'which are boosting natural pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    (Based on Highest Nests)\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },
        2: {
            costBase() { return new Decimal(25000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(player.n.highestNest.add(1).log(10).add(1)).add(1)},
            unlocked() { return hasUpgrade("n", 71) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Pylon Factor II"
            },
            display() {
                return 'which are boosting natural pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    (Based on Highest Nests)\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },
        3: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(player.n.highestNest.add(1).log(10).add(1)).add(1)},
            unlocked() { return hasUpgrade("n", 71) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Pylon Factor III"
            },
            display() {
                return 'which are boosting natural pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    (Based on Highest Nests)\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },

        41: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(90) },
            currency() { return player.n.nest },
            pay(amt) { player.n.nest = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id).pow(2)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && hasUpgrade("n", 31) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 4:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Multiply most bee research caps<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).div(10).add(1)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatWhole(tmp[this.layer].buyables[this.id].cost) + " Nests" + // BOTTOM
                "</div></div>"
            },
            tooltip: "Excess research cap does not count for new layers",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        42: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.n.nest },
            pay(amt) { player.n.nest = this.currency().sub(amt) },
            effect(x) { return player.fl.totalLevels.div(1500).add(1).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id).pow(2)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && hasUpgrade("n", 31) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 4:2</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Buff nest gain based on total flower levels<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                "<br>Next: x" + formatSimple(player.fl.totalLevels.div(1500).add(1).pow(getBuyableAmount(this.layer, this.id).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatWhole(tmp[this.layer].buyables[this.id].cost) + " Nests" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },

        51: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(9) },
            currency() { return player.n.nest },
            pay(amt) { player.n.nest = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id).pow(2)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && (getBuyableAmount("n", 41).gt(0) || getBuyableAmount("n", 42).gt(0)) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 5:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock new aleph researches<br>" + // MIDDLE
                "Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                "<br>Next: +" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).mul(2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatWhole(tmp[this.layer].buyables[this.id].cost) + " Nests" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        52: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.n.nest },
            pay(amt) { player.n.nest = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(50).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id).pow(2)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && (getBuyableAmount("n", 41).gt(0) || getBuyableAmount("n", 42).gt(0)) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 5:2</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Raise pollen and nectar α gain<br>" + // MIDDLE
                "Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                "<br>Next: ^" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).div(50).add(1), 2) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatWhole(tmp[this.layer].buyables[this.id].cost) + " Nests" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        53: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.n.nest },
            pay(amt) { player.n.nest = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id).pow(2)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && (getBuyableAmount("n", 41).gt(0) || getBuyableAmount("n", 42).gt(0)) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 5:3</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock new purple flowers<br>" + // MIDDLE
                "Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                "<br>Next: +" + formatSimple(getBuyableAmount(this.layer, this.id).add(1)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatWhole(tmp[this.layer].buyables[this.id].cost) + " Nests" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
    },
    milestones: {
        11: {
            requirementDescription: "1 Nest Reset",
            effectDescription() { return "Keep cocoon milestones on nest reset" },
            done() { return player.n.nestReset.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        12: {
            requirementDescription: "2 Nest Resets",
            effectDescription() { return "Keep 2% of aleph buyables per nest reset<br>Currently: " + formatWhole(player.n.nestReset.mul(2).min(100)) + "%" },
            done() { return player.n.nestReset.gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        13: {
            requirementDescription: "3 Nest Resets",
            effectDescription() { return "Increase red flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(3) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        14: {
            requirementDescription: "4 Nest Resets",
            effectDescription() { return "Unlock an effect for nest that buffs pollinator gain<br>(Based on highest nests)" },
            done() { return player.n.nestReset.gte(4) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        15: {
            requirementDescription: "6 Nest Resets",
            effectDescription() { return "Increase blue flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(6) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        16: {
            requirementDescription: "8 Nest Resets",
            effectDescription() { return "Automatically purchase bee researches" },
            done() { return player.n.nestReset.gte(8) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        17: {
            requirementDescription: "10 Nest Resets",
            effectDescription() { return "Increase green flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(10) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        18: {
            requirementDescription: "15 Nest Resets",
            effectDescription() { return "Total nest purchases boost golden grass gain<br>Currently: ^" + formatSimple(player.n.milestone8Effect, 2) },
            done() { return player.n.nestReset.gte(15) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        19: {
            requirementDescription: "20 Nest Resets",
            effectDescription() { return "All flower automation milestones are buffed based by total nest milestones, starting with this milestone<br>Currently: +" + formatWhole(Decimal.max(player.n.milestones.length - 8, 0)) + "%" },
            done() { return player.n.nestReset.gte(20) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        20: {
            requirementDescription: "30 Nest Resets",
            effectDescription() { return "Keep gatherers on all resets" },
            done() { return player.n.nestReset.gte(30) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        21: {
            requirementDescription: "40 Nest Resets",
            effectDescription() { return "Increase pink flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(40) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        22: {
            requirementDescription: "50 Nest Resets",
            effectDescription() { return "Automate aleph upgrades" },
            done() { return player.n.nestReset.gte(50) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        23: {
            requirementDescription: "65 Nest Resets",
            effectDescription() { return "Increase yellow flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(65) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        24: {
            requirementDescription: "80 Nest Resets",
            effectDescription() { return player.n.milestone14Effect.lte(2) ? "Boost rocket fuel gain based on nest resets<br>Currently: ^" + formatSimple(player.n.milestone14Effect, 2) : "Boost rocket fuel gain based on nest resets<br>Currently: ^" + formatSimple(player.n.milestone14Effect, 2) + " <small style='color:red'>[SOFTCAPPED]</small>" },
            done() { return player.n.nestReset.gte(80) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        25: {
            requirementDescription: "100 Nest Resets",
            effectDescription() { return "Increase purple flower amounts by " + formatWhole(player.n.flowerPercentage.mul(100)) + "% of flower gain per second" },
            done() { return player.n.nestReset.gte(100) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("n", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
    },
    microtabs: {
        Tabs: {
            "Upgrades": {
                buttonStyle: {borderColor: "#E3987A", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["tooltip-row", [
                        ["raw-html", () => {return player.n.nest.eq(1) ? "You have <h3>" + formatWhole(player.n.nest) + "</h3> Nest." : "You have <h3>" + formatWhole(player.n.nest) + "</h3> Nests." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasUpgrade("n", 31) ? "(+" + formatWhole(player.n.nestGain) + ")" : ""}, () => {
                            let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                            player.al.honeycomb.gte(1e25) && player.al.royalJelly.gte(1e25) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                        ["raw-html", () => {return hasUpgrade("n", 31) ? "<div class='bottomTooltip'>Base Formula<hr><small>2^(log<sub>1e20</sub>((Honeycombs*Royal Jelly)/1e60))</small></div>" : ""}],
                    ]],
                    ["raw-html", () => {return hasMilestone("n", 14) ? "Boosts pollinators by x" + formatSimple() : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 1],
                    ["blank", "10px"],
                    ["upgrade", 11],
                    ["row", [["upgrade", 21], ["upgrade", 22]]],
                    ["upgrade", 31],
                    ["row", [["buyable", 41], ["buyable", 42]]],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53]]],
                    ["row", [["upgrade", 61], ["upgrade", 62]]],
                    ["upgrade", 71],
                ],
            },
            "Milestones": {
                buttonStyle: {borderColor: "#E3987A", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "15px"],
                    ["style-row", [
                        ["raw-html", () => {return player.n.nestReset.eq(1) ? "You have 1 nest reset" : "You have " + formatWhole(player.n.nestReset) + " nest resets"}, {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRadius: "13px 13px 0px 0px", width: "588px", height: "40px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 11],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 12],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "3", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 13],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "4", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 14],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "6", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 15],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "8", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 16],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "10", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 17],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "15", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 18],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "20", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 19],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "30", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 20],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "40", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 21],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "50", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 22],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "65", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 23],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "80", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 24],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "100", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 25],
                    ]],
                    ["style-row", [
                    ], {backgroundColor: "#E3987A", border: "3px solid #9e6a55", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "10px"}],
                ],
            },
            "Pylon": {
                buttonStyle: {borderColor: "#E3987A", borderRadius: "15px"},
                unlocked() {return hasUpgrade("n", 71)},
                content: [
                    ["blank", "25px"],
                    ["left-row", [
                        ["tooltip-row", [
                            ["raw-html", "<img src='resources/fragments/naturalFragment.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                            ["raw-html", () => { return formatWhole(player.cof.coreFragments[1])}, {width: "103px", height: "50px", color: "#458c46", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                            ["raw-html", "<div class='bottomTooltip'>Natural Core Fragments</div>"],
                        ], {width: "158px", height: "50px",}],
                    ], {width: "158px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.n.pylonEnergy) + "/" + format(player.n.pylonEnergyMax) +  "</h3> natural pylon energy (" + format(player.n.pylonEnergyPerSecond) + "/s)."}, {color: "#000000ff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts UB tickspeed by x" + format(player.n.pylonEnergyEffect) + "."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts glossary effect base by x" + format(player.n.pylonEnergyEffect2) + "."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts temporal pylon energy by x" + format(player.n.pylonEnergyEffect3) + "."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Passive effect: Boosts hex power gain by ^" + format(player.n.pylonPassiveEffect) + " (Based on bees)"}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 1], ["ex-buyable", 2], ["ex-buyable", 3],]], 
                    ["blank", "25px"],
                    ["raw-html", () => {return "Your natural pylon is tier " + formatWhole(player.n.pylonTier) + ", which boosts all pylon effects by ^" + format(player.n.pylonTierEffect) + "."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["clickable", 2],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have " + format(player.al.honeycomb) + " Honeycombs"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "You have " + format(player.al.royalJelly) + " Royal Jelly"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["microtabs", "Tabs", {borderWidth: "0"}],
        ["blank", "20px"],
    ],
    layerShown() { return player.startedGame && hasMilestone("dgj", 14)}
})