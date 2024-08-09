addLayer("ca", {
    name: "Cante, the Celestial of Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { return "Ξ"} , // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedCante: false,

        replicanti: new Decimal(1),
        replicantiEffect: new Decimal(1),
        replicantiEffect2: new Decimal(1),
        replicantiEffect3: new Decimal(1),
        replicantiMult: new Decimal(1),

        replicateChance: new Decimal(0.01),

        replicantiTimer: new Decimal(0),
        replicantiTimerReq: new Decimal(60),

        galaxyDust: new Decimal(0),
        galaxyDustEffect: new Decimal(1),
        galaxyDustToGet: new Decimal(0),

        canteCores: new Decimal(0),

        canteEnergy: new Decimal(0),
        canteEnergyReq: new Decimal(100),
        canteEnergyMult: new Decimal(1),

        replicantiGalaxies: new Decimal(0),
        replicantiGalaxiesCap: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
            "background-origin": "border-box",
            "border-color": "#0f354c",
        };
    },
    
    tooltip: "Cante, the Celestial of Replicanti",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ca.replicantiMult = new Decimal(1.05)
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 12))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 15))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 18))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("rm", 34))

        player.ca.replicantiTimerReq = new Decimal(1)
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 13))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 16))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 19))

        player.ca.replicateChance = new Decimal(0.02)
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 11))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 14))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 17))

        player.ca.replicantiTimer = player.ca.replicantiTimer.add(onepersec.mul(delta))

        if (player.ca.replicantiTimer.gte(player.ca.replicantiTimerReq))
        {
            layers.ca.replicantiMultiply();
        }

        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect = player.ca.replicanti.plus(1).log10().pow(1.2).pow(0.7).add(1) } else { player.ca.replicantiEffect = new Decimal(1) }
        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect2 = player.ca.replicanti.plus(1).log10().pow(2.4).pow(0.4).add(1) } else { player.ca.replicantiEffect2 = new Decimal(1) }
        player.ca.replicantiEffect3 = player.ca.replicanti.pow(0.5)
        
        //CANTE
        player.ca.canteEnergyMult = new Decimal(1)

        if (player.ca.canteEnergy.gte(player.ca.canteEnergyReq))
        {
            layers.ca.gainCanteCore()
        }

        player.ca.canteEnergyReq = player.ca.canteCores.mul(10).add(100)

        player.ca.galaxyDustToGet = player.ca.replicanti.plus(1).log10().pow(0.8)
        player.ca.galaxyDustEffect = player.ca.galaxyDust.plus(1).log10().mul(0.1).add(1)
        
        //rep galax
        player.ca.replicantiGalaxiesCap = buyableEffect("ca", 23)
    },
    gainCanteCore()
    {
        let leftover = new Decimal(0)
        leftover = player.ca.canteEnergy.sub(player.ca.canteEnergyReq)
        player.ca.canteCores = player.ca.canteCores.add(1)
        player.ca.canteEnergy = new Decimal(0)
        player.ca.canteEnergy = player.ca.canteEnergy.add(leftover)
    },
    replicantiMultiply()
    {
        let random = new Decimal(0)
        random = Math.random()
        if (random < player.ca.replicateChance)
        {
            if (player.ca.replicanti.lt(1.79e308))
            {
                player.ca.replicanti = player.ca.replicanti.mul(player.ca.replicantiMult)
            } else
            {
                player.ca.replicanti = new Decimal(1.79e308)
            }
        }
        player.ca.replicantiTimer = new Decimal(0)
    },
    branches: ["ta", "om"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h1>UNLOCK" },
            canClick() { return player.cb.level.gte(500) && player.ad.antimatter.gte("1e600") && player.in.infinities.gte(250000) && player.h.hexPoints[19].gte(1e20) && player.ta.highestDicePoints.gte(1e50) && player.cb.petPoints.gte(1000) },
            unlocked() { return true},
            onClick() {
                player.ca.unlockedCante = true
                player.subtabs["ca"]['stuff'] = 'Main'
            },
            style: { width: '400px', "min-height": '160px' },
        },
        12: {
            title() { return "<h3>Reset replicanti, but gain galaxy dust. (Req: 1e10 replicanti)" },
            canClick() { return player.ca.replicanti.gte(1e10) },
            unlocked() { return true },
            onClick() {
                player.ca.galaxyDust = player.ca.galaxyDust.add(player.ca.galaxyDustToGet)
                player.ca.replicanti = new Decimal(1)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        13: {
            title() { return "<h3>Reset replicanti, but gain a replicanti galaxy. (Req: 1.79e308 replicanti)" },
            canClick() { return player.ca.replicanti.gte(1.79e308) && player.ca.replicantiGalaxies.lt(player.ca.replicantiGalaxiesCap) },
            unlocked() { return true },
            onClick() {
                player.ca.replicantiGalaxies = player.ca.replicantiGalaxies.add(1)
                player.ca.replicanti = new Decimal(1)
            },
            style: { width: '400px', "min-height": '100px' },
        },
    },
    bars: {
        bar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 800,
            height: 50,
            progress() {
                return player.ca.canteEnergy.div(player.ca.canteEnergyReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "<h5>" + format(player.ca.canteEnergy) + "/" + formatWhole(player.ca.canteEnergyReq) + "<h5> Cante energy to gain a cante core.</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e18) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicate Chance"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(1e18)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e19) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.025) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Mult"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(1e19)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Interval"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(1e20)
                let growth = 100
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e13) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicate Chance+"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1e13)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e14) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.025) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Mult+"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1e14)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e15) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Interval+"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1e15)
                let growth = 100
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.008) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicate Chance++"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(6) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03) },
            unlocked() { return hasUpgrade("bi", 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Mult++"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(6)
                let growth = 3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Interval++"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px',}
        },
        21: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimension Boost Base"
            },
            display() {
                return "which are multiplying the dimension boost base by " + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px',}
        },
        22: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tickspeed Base"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the tickspeed base.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px',}
        },
        23: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>MAX REPLICANTI GALAXIES"
            },
            display() {
                return "which are increasing replicanti galaxy capacity by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px',}
        },
        24: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(150) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).mul(player.ca.galaxyDust.pow(0.3)).add(1) },
            unlocked() { return hasUpgrade('bi', 27) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>INFINITY POINTS"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (also based on galaxy dust)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy() {
                let base = new Decimal(150)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px',}
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
            "Unlock": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return !player.ca.unlockedCante },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "Unlock Replicanti:" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return formatWhole(player.cb.level) + "/500 Check Back Level" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return format(player.ad.antimatter) + "/1e600 Antimatter" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return formatWhole(player.in.infinities) + "/250,000 Infinities" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return format(player.h.hexPoints[19]) + "/1e20 Hex 20 Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return format(player.ta.highestDicePoints) + "/1e50 Highest Dice Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return format(player.cb.petPoints) + "/1,000 Pet Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 11]]],
    ]
            },
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ca.unlockedCante },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
        ["raw-html", function () { return "which boosts infinity points by <h3>" + format(player.ca.replicantiEffect) + "</h3>x, infinity dimensions by <h3>" + format(player.ca.replicantiEffect2) + "</h3>x, and points by <h3>" + format(player.ca.replicantiEffect3) + "</h3>x." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Caps out at 1.79e308 replicanti)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return "Time: " + formatTime(player.ca.replicantiTimer) + "/" + formatTime(player.ca.replicantiTimerReq) }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.ca.replicantiMult) + "x" }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicate Chance: " + format(player.ca.replicateChance.mul(100)) + "%" }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
        ["row", [["buyable", 14], ["buyable", 15], ["buyable", 16]]],
        ["row", [["buyable", 17], ["buyable", 18], ["buyable", 19]]],
    ]
            },
            "Galaxy Dust": {
                buttonStyle() { return { 'border-color': '#241c44', 'background-color': '#333c81', "color": "white" }  },
                unlocked() { return player.ca.unlockedCante && hasUpgrade("bi", 26) },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ca.galaxyDust) + "</h3> galaxy dust." }, { "color": "#979EE8", "font-size": "26px", "font-family": "monospace" }],
        ["raw-html", function () { return "Galaxy dust multiplies antimatter galaxy effect base by <h3>" + format(player.ca.galaxyDustEffect) + "</h3>x." }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will <h3>" + format(player.ca.galaxyDustToGet) + "</h3> galaxy dust on reset." }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 12]]],
        ["blank", "25px"],
        ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.replicantiGalaxies) + "/" + formatWhole(player.ca.replicantiGalaxiesCap) + "</h3> replicanti galaxies." }, { "color": "#979EE8", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "(They just act like regular antimatter galaxies)" }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 13]]],
    ]
            },
            "CELESTIAL": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ca.unlockedCante },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> Cante's cores." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["bar", "bar"]]],
        ["blank", "25px"],
        ["raw-html", function () { return "Energy multiplier: <h3>" + formatWhole(player.ca.canteEnergyMult) + "</h3>x" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Cante energy is gained by clicking on check back buttons." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return "Cante cores will have many uses in the future." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
    ]
            },
        },
    }, 

    tabFormat: [        
        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 24)}
})
