addLayer("cs", {
    name: "Core Scraps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coreScraps: new Decimal(0),
        coreScrapsToGet: new Decimal(0),

        scrapCoreOnReset: false,

        resourceCoreScraps: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0), ],
        resourceCoreScrapsToGet: new Decimal(0),

        coreScrapMax: false,

        paragonScraps: new Decimal(0),
        paragonScrapsEffect: new Decimal(1),
        canBuyParagonScraps: false,
    
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #4f4b45 0%, #2b2522 100%)",
            "background-origin": "border-box",
            "border-color": "#ababab",
            "color": "#ababab",
        };
    },
    tooltip: "Core Scraps",
    branches: ["ra", "sd"],
    color: "#4f4b45",
    update(delta) {
        let onepersec = new Decimal(1)

        //ALL SCRAP GAINS ARE INTEGERS
        if (player.cop.processedCoreFuel.neq(-1))
        {
            player.cs.coreScrapsToGet = player.cop.processedCoreStrength.pow(1.4).add(1).mul(10).add(20).floor()
        } else
        {
            player.cs.coreScrapsToGet = new Decimal(0)
        }

        if (player.cop.processedCoreFuel.eq(0))
        {   
            player.cs.resourceCoreScrapsToGet = player.points.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(1))
        {   
            player.cs.resourceCoreScrapsToGet = player.f.factorPower.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(2))
        {   
            player.cs.resourceCoreScrapsToGet = player.p.prestigePoints.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(3))
        {   
            player.cs.resourceCoreScrapsToGet = player.t.trees.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(4))
        {   
            player.cs.resourceCoreScrapsToGet = player.g.grass.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(5))
        {   
            player.cs.resourceCoreScrapsToGet = player.gh.grasshoppers.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(6))
        {   
            player.cs.resourceCoreScrapsToGet = player.m.codeExperience.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(7))
        {   
            player.cs.resourceCoreScrapsToGet = player.d.dicePoints.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(8))
        {   
            player.cs.resourceCoreScrapsToGet = player.m.codeExperience.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(9))
        {   
            player.cs.resourceCoreScrapsToGet = player.ad.antimatter.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        }
        if (player.cop.processedCoreFuel.eq(10))
        {   
            player.cs.resourceCoreScrapsToGet = player.in.infinityPoints.plus(10).log10().log10().add(1).mul(player.cop.processedCoreStrength.add(1)).floor()
        } 
        if (player.cop.processedCoreFuel.eq(-1))
        {
            player.cs.resourceCoreScrapsToGet = new Decimal(0)
        }

        for (let i = 0; i < player.cs.resourceCoreScraps.length; i++)
        {
            if (player.cs.resourceCoreScraps[i].gte(2))
            {
                player.cs.canBuyParagonScraps = true
            } else
            {
                player.cs.canBuyParagonScraps = false
                break;
            }
        }

        player.cs.paragonScrapsEffect = player.cs.paragonScraps.mul(0.6).pow(0.3).add(1)
    },
    scrapCore()
    {
        player.cs.coreScraps = player.cs.coreScraps.add(player.cs.coreScrapsToGet)
        player.cs.resourceCoreScraps[player.cop.processedCoreFuel] = player.cs.resourceCoreScraps[player.cop.processedCoreFuel].add(player.cs.resourceCoreScrapsToGet)

        player.cop.processingCore = false
        player.cop.processedCoreStrength = new Decimal(-1)
        player.cop.processedCoreFuel = new Decimal(-1)

        player.ra.equippedRadiationValue = new Decimal(0)
        player.ra.equippedRadiationOutput = new Decimal(0)

        player.cop.processedCoreInnateEffects = []
        player.cop.processedCoreInnateEffectsText = ""
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.cs.coreScrapMax == false },
            unlocked() { return true },
            onClick() {
                player.cs.coreScrapMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.cs.coreScrapMax == true  },
            unlocked() { return true },
            onClick() {
                player.cs.coreScrapMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "Scrap Core" },
            canClick() { return player.cs.scrapCoreOnReset == false },
            unlocked() { return true },
            onClick() {
                player.cs.scrapCoreOnReset = true
            },
            style: { width: '100px', "min-height": '50px', borderRadius: "10px 0px 0px 10px"}
        },
        5: {
            title() { return "Don't Scrap Core" },
            canClick() { return player.cs.scrapCoreOnReset == true  },
            unlocked() { return true },
            onClick() {
                player.cs.scrapCoreOnReset = false
            },
            style: { width: '100px', "min-height": '50px', borderRadius: "0px 10px 10px 0px"}
        },
        6: {
            title() { return "Convert Existing Scraps to Paragon Scraps<br>(Req: 25 core scraps, 2 of each resource specific scraps)" },
            canClick() { return player.cs.canBuyParagonScraps == true && player.cs.coreScraps.gte(25) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.cs.resourceCoreScraps.length; i++)
                {
                    player.cs.resourceCoreScraps[i] = player.cs.resourceCoreScraps[i].sub(2)
                }
                player.cs.coreScraps = player.cs.coreScraps.sub(25)

                player.cs.paragonScraps = player.cs.paragonScraps.add(1)
            },
            style: { width: '300px', "min-height": '150px', borderRadius: "15px"}
        },
    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {
        //core scraps boost radiation stuff (radiation output, softcap, gain, etc)
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.coreScraps},
            pay(amt) { player.cs.coreScraps = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radiation Output Increaser"
            },
            display() {
                return 'which are increasing the radiation output of new cores by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        12: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1500) },
            currency() { return player.cs.coreScraps},
            pay(amt) { player.cs.coreScraps = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Radiation Increaser"
            },
            display() {
                return 'which are dividing and extending the radiation softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        13: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cs.coreScraps},
            pay(amt) { player.cs.coreScraps = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Radiation Value Increaser"
            },
            display() {
                return 'which are increasing the radiation value of new cores by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        //resource specific scraps boost the effect of buyables
        21: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[0]},
            pay(amt) { player.cs.resourceCoreScraps[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.25).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Point Scrap Buyable Booster"
            },
            display() {
                return 'which are raising time cube buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Rank Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        22: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[1]},
            pay(amt) { player.cs.resourceCoreScraps[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.25).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Factor Power Scrap Buyable Booster"
            },
            display() {
                return 'which are raising factor buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Factor Power Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        23: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[2]},
            pay(amt) { player.cs.resourceCoreScraps[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Point Scrap Buyable Booster"
            },
            display() {
                return 'which are raising crystal buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Prestige Point Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        24: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[3]},
            pay(amt) { player.cs.resourceCoreScraps[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Scrap Buyable Booster"
            },
            display() {
                return 'which are raising tree buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tree Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        25: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[4]},
            pay(amt) { player.cs.resourceCoreScraps[4] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Grass Scrap Buyable Booster"
            },
            display() {
                return 'which are raising grass and golden grass buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        26: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[5]},
            pay(amt) { player.cs.resourceCoreScraps[5] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.4).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Grasshopper Scrap Buyable Booster"
            },
            display() {
                return 'which are raising SOME grass study and steel buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grasshopper Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        27: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[6]},
            pay(amt) { player.cs.resourceCoreScraps[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Code Experience Scrap Buyable Booster"
            },
            display() {
                return 'which are raising mod buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Code Experience Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        28: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[7]},
            pay(amt) { player.cs.resourceCoreScraps[7] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.28).mul(1.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Dice Point Scrap Buyable Booster"
            },
            display() {
                return 'which are raising booster dice and pollinator effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dice Point Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        29: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[8]},
            pay(amt) { player.cs.resourceCoreScraps[8] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.15).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Rocket Fuel Scrap Buyable Booster"
            },
            display() {
                return 'which are raising rocket fuel effects and OTF mastery buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Rocket Fuel Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        31: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[9]},
            pay(amt) { player.cs.resourceCoreScraps[9] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.15).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Antimatter Scrap Buyable Booster"
            },
            display() {
                return 'which are raising the antimatter effect and OTF synergizer and NIP buyable effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Antimatter Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        32: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cs.resourceCoreScraps[10]},
            pay(amt) { player.cs.resourceCoreScraps[10] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.15).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gt(this.cost()) },
            title() {
                return "Infinity Point Scrap Buyable Booster"
            },
            display() {
                return 'which are raising the IP buyable (except doubler) and broken infinity buyables by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Infinity Point Core Scraps'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
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
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.coreScraps) + "</h3> core scraps." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current core being processed: " + player.coa.strengths[player.cop.processedCoreStrength] + " " + player.coa.fuels[player.cop.processedCoreFuel] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<div id=processedCore class=singularityCore><div class=centerCircle></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.cs.coreScrapsToGet) + "</h3> core scraps on singularity reset. (Based on strength)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.cs.resourceCoreScrapsToGet) + "</h3> resource specific core scraps on singularity reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Type is determined from fuel type, and based on amount of said fuel source and strength.)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]
            },
            "Resource Specific Core Scraps": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[0]) + "</h3> point core scraps." }, { "color": "#5c5c5c", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[1]) + "</h3> factor power core scraps." }, { "color": "#83cecf", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[2]) + "</h3> prestige point core scraps." }, { "color": "#31aeb0", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[3]) + "</h3> tree core scraps." }, { "color": "#0B6623", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[4]) + "</h3> grass core scraps." }, { "color": "#119B35", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[5]) + "</h3> grasshopper core scraps." }, { "color": "#19e04d", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[6]) + "</h3> code experience core scraps." }, { "color": "#0951a6", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[7]) + "</h3> dice point core scraps." }, { "color": "#363636", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[8]) + "</h3> rocket fuel core scraps." }, { "color": "#2f4f57", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[9]) + "</h3> antimatter core scraps." }, { "color": "#0FFFCA", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.resourceCoreScraps[10]) + "</h3> infinity point core scraps." }, { "color": "#FFBF00", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.coreScraps) + "</h3> core scraps." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
                    ["row", [["ex-buyable", 21],["ex-buyable", 22],["ex-buyable", 23],["ex-buyable", 24],]],
                    ["row", [["ex-buyable", 25],["ex-buyable", 26],["ex-buyable", 27],["ex-buyable", 28],]],
                    ["row", [["ex-buyable", 29],["ex-buyable", 31],["ex-buyable", 32],]],
                ]
            },
            "Paragon Scraps": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("s", 20) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.paragonScraps) + "</h3> paragon scraps, which boosts check back xp gain by x" + format(player.cs.paragonScrapsEffect) + "." }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cs.coreScraps) + "</h3> core scraps." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 6],]],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 19)  }
})
