addLayer("ds", {
    name: "Space Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        spaceEnergy: new Decimal(0),
        spaceEnergyEffect: new Decimal(1),
        spaceEnergyToGet: new Decimal(0),
        storedSpaceEnergyToGet: new Decimal(0),

        spaceEnergyPause: new Decimal(0),

        //space
        space: new Decimal(0),
        spaceEffect: new Decimal(1),
        
        length: new Decimal(1),
        lengthPerSecond: new Decimal(0),
        width: new Decimal(1),
        widthPerSecond: new Decimal(0),
        depth: new Decimal(1),
        depthPerSecond: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #221473ff 0%, #c5c5c5ff 50%, #147363 100%)",
            "background-origin": "border-box",
            "border-color": "#040027ff",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Space",
    branches: [["dn", "#309"]],
    color: "#221473ff",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ds.spaceEnergyToGet = player.dn.normality.div(1e30).pow(0.15).div(4)
        player.ds.spaceEnergyToGet = player.ds.spaceEnergyToGet.mul(buyableEffect("ds", 105))
        player.ds.spaceEnergyToGet = player.ds.spaceEnergyToGet.mul(levelableEffect("ir", 4)[0])

        player.ds.spaceEnergyPause = player.ds.spaceEnergyPause.sub(1)
        if (player.ds.spaceEnergyPause.gte(1)) layers.ds.spaceEnergyReset();

        player.ds.spaceEnergyEffect = player.ds.spaceEnergy.add(1).log(10).pow(1.5).div(10).add(1)

        //space
        player.ds.space = player.ds.length.mul(player.ds.width.mul(player.ds.depth))
        player.ds.spaceEffect = player.ds.space.plus(1).log10().div(3).add(1)
        if (player.ds.space.eq(1))
        {
        player.ds.spaceEffect = new Decimal(1)
        }

        player.ds.length = player.ds.length.add(player.ds.lengthPerSecond.mul(delta))
        player.ds.lengthPerSecond = buyableEffect("ds", 11)
        player.ds.lengthPerSecond = player.ds.lengthPerSecond.mul(buyableEffect("ds", 106))

        player.ds.width = player.ds.width.add(player.ds.widthPerSecond.mul(delta))
        player.ds.widthPerSecond = buyableEffect("ds", 12)
        player.ds.widthPerSecond = player.ds.widthPerSecond.mul(buyableEffect("ds", 106))

        player.ds.depth = player.ds.depth.add(player.ds.depthPerSecond.mul(delta))
        player.ds.depthPerSecond = buyableEffect("ds", 13)
        player.ds.depthPerSecond = player.ds.depthPerSecond.mul(buyableEffect("ds", 106))

        //stored
        player.ds.storedSpaceEnergyToGet = player.ds.spaceEnergy.mul(0.05).pow(0.6)
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Reset previous content for space energy.<br>(based on normality)</h2>" },
            canClick() { return player.ds.spaceEnergyToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.ds.spaceEnergy = player.ds.spaceEnergy.add(player.ds.spaceEnergyToGet)
                player.ds.spaceEnergyPause = new Decimal(6)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #331ea5ff", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    spaceEnergyReset()
    {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)
        player.dp.buyables[14] = new Decimal(0)
        player.dp.buyables[15] = new Decimal(0)
        player.dp.buyables[16] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)
        player.dg.buyables[14] = new Decimal(0)
        player.dg.buyables[15] = new Decimal(0)
        player.dg.buyables[16] = new Decimal(0)

        player.dn.normality = new Decimal(0)
        player.dn.buyables[11] = new Decimal(0)
        player.dn.buyables[12] = new Decimal(0)
        player.dn.buyables[13] = new Decimal(0)
        for (let i = 0; i < player.dn.upgrades.length; i++) {
            if (+player.dn.upgrades[i] < 14) {
                player.dn.upgrades.splice(i, 1);
                i--;
            }
        }

        player.ds.length = new Decimal(1)
        player.ds.width = new Decimal(1)
        player.ds.depth = new Decimal(1)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.spaceEnergy},
            pay(amt) { player.ds.spaceEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.3).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Lengthener"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " length per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.spaceEnergy},
            pay(amt) { player.ds.spaceEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.001) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Widthener"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " width per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.spaceEnergy},
            pay(amt) { player.ds.spaceEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).mul(0.0001) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Depthener"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " depth per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },


        //space upgrades
        101: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(20).pow(2.8).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Space Boost"
            },
            display() {
                return "which are multiplying prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
        102: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.55) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(15).pow(2.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Generator Space Boost"
            },
            display() {
                return "which are multiplying generator gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
        103: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).pow(1.8).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Grass Space Boost"
            },
            display() {
                return "which are multiplying dark grass value and capacity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
        104: {
            costBase() { return new Decimal(64) },
            costGrowth() { return new Decimal(1.85) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(8).pow(1.6).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Normality Space Boost"
            },
            display() {
                return "which are multiplying normality gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
        105: {
            costBase() { return new Decimal(256) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Space Energy Space Boost"
            },
            display() {
                return "which are multiplying space energy gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
        106: {
            costBase() { return new Decimal(1024) },
            costGrowth() { return new Decimal(2.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ds.space},
            pay(amt) { player.ds.space = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Space Space Boost"
            },
            display() {
                return "which are multiplying length, width, and depth gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Energy"
            },
            buy(mult) {
                if (!mult) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))

                    player.ds.length = new Decimal(1)
                    player.ds.width = new Decimal(1)
                    player.ds.depth = new Decimal(1)
                }
            },
            style: { width: '275px', height: '150px', color: "white" }
        },
    },
    milestones: {
        //yes these will exist
        //yes these wont reset on leave
        //yes these boost non du1 related things
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #331ea5ff", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => { return "You have " + format(player.ds.spaceEnergy) + " space energy"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.ds.spaceEnergyToGet) + ")"}, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.ds.spaceEnergyToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Extends unavoidable point softcap<sup>2</sup> by ^" + format(player.ds.spaceEnergyEffect)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "You will store " + format(player.ds.storedSpaceEnergyToGet) + " space energy when you leave D1."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have " + format(player.ds.space) + " space. (based on product of length, width, and depth)"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts starmetal alloy gain by x" + format(player.ds.spaceEffect) + "."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "<h4>(Reset on space energy reset)"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "Length: " + format(player.ds.length) + ". (+" + format(player.ds.lengthPerSecond) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Width: " + format(player.ds.width) + ". (+" + format(player.ds.widthPerSecond) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Depth: " + format(player.ds.depth) + ". (+" + format(player.ds.depthPerSecond) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13]]],
                ]
            },
            "Space Buyables": {
                buttonStyle() { return { border: "2px solid #331ea5ff", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => { return "You have " + format(player.ds.space) + " space. (based on product of length, width, and depth)"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "<h4>Buying these will reset space back to 1."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 101], ["dark-buyable", 102], ["dark-buyable", 103]]],
                    ["row", [["dark-buyable", 104], ["dark-buyable", 105], ["dark-buyable", 106]]],
                ]
            },
            "Milestones": {
                buttonStyle() { return { border: "2px solid #331ea5ff", borderRadius: "10px" } },
                unlocked() { return false },
                content: [
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("dn", 14) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})